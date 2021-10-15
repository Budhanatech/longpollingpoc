import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {RESULT_SERVICE} from '../keys';
import {ResultService} from '../services';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('g1')
export class StartObserver implements LifeCycleObserver {
  constructor(@inject(RESULT_SERVICE) private resultService: ResultService) {}

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.resultService.startListening();
  }
}
