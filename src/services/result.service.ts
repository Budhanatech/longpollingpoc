/* eslint-disable @typescript-eslint/no-explicit-any */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import got from 'got';
import config from '../config';
import {HorseRepository, ResultRepository} from '../repositories';

interface IUser {
  email: string;
  password: string;
}

/**
 * Service file to handle external datasource i.e API
 * Saves response from API in underlying database
 */
@injectable({scope: BindingScope.SINGLETON})
export class ResultService {
  token: string;
  unexpectedErrorCount = 0;
  authErrorCount = 0;
  constructor(
    @repository(ResultRepository) protected resultRepository: ResultRepository,
    @repository(HorseRepository) protected horseRepository: HorseRepository,
  ) {}

  /**
   * Start observing events emitted by REST API
   */
  async startListening(): Promise<void> {
    try {
      if (!this.token) {
        await this.getToken();
      }
      await this.startSavingResults();
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Method to save results to database
   */
  async startSavingResults(): Promise<void> {
    try {
      const response = await got(config.RESULT_URL, {
        headers: {Authorization: `Bearer ${this.token}`},
      });

      if (response.statusCode === config.SUCCESS_STATUS) {
        const result = JSON.parse(response.body);
        const resultInstance = await this.resultRepository.create({
          event: result.event,
          time: result.time,
        });
        const isHorseExists = await this.horseRepository.exists(
          result.horse.id,
        );
        if (!isHorseExists) {
          await this.resultRepository
            .horse(resultInstance.id)
            .create(result.horse);
        }
        console.log('Result Saved');
        console.log(result);
      }

      if (response.statusCode === config.SUCCESS_NOCONTENT_STATUS) {
        console.log('No event published trying again...');
      }
    } catch (e: any) {
      console.log(e);
      if (e.response) {
        await this.handleResultAPIError(e);
      } else {
        await this.handleUnexpectedError(e);
      }
    } finally {
      await this.startSavingResults();
    }
  }

  /**
   * Method to get authorisation token against user credentials provided
   */
  async getToken(): Promise<void> {
    const user: IUser = {email: config.TEMP_EMAIL, password: config.TEMP_PASS};
    try {
      const response = await got.post(config.LOGIN_URL, {
        json: user,
      });
      const result = response.body;
      this.token = JSON.parse(result).token;
    } catch (e: any) {
      console.log(e);
      if (e.response) {
        await this.handleAuthAPIError(e);
      } else {
        await this.handleUnexpectedError(e);
      }
    }
  }

  /**
   * Method to handle error responses from results API
   * @param e property containing error from api response
   */
  async handleResultAPIError(e: any) {
    if (e.response.statusCode === config.AUTH_FAILED_STATUS) {
      this.authErrorCount = this.authErrorCount + 1;
      if (this.authErrorCount > config.AUTH_RETRY_COUNT) {
        console.log(
          `API authentication failed too many times, exiting application...`,
        );
        process.exit(1);
      }
      await this.getToken();
    } else {
      await this.handleUnexpectedError(e);
    }
  }

  /**
   * Method to handle error responses from auth API
   * @param e property containing error from api response
   */
  async handleAuthAPIError(e: any) {
    if (e.response.statusCode === config.AUTH_FAILED_STATUS) {
      console.log(
        'Authentication failed, please check credentials in config folder',
      );
      process.exit(1);
    } else if (e.response.statuCode === config.SERVER_BUSY_STATUS) {
      console.log('Server Busy, trying again in 2 seconds');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.getToken();
    } else {
      await this.handleUnexpectedError(e);
    }
  }

  /**
   * Method to handle error from unexpected behaviours of the code
   * @param e property containing error from unexpected behaviours
   */
  async handleUnexpectedError(e: any) {
    console.log('An unexpected error occured, restarting the process...');
    console.log(e);
    this.unexpectedErrorCount = this.unexpectedErrorCount + 1;
    if (this.unexpectedErrorCount > config.RETRY_COUNT) {
      console.log('Retry count exceeded, exiting application...');
      process.exit(1);
    }
  }
}
