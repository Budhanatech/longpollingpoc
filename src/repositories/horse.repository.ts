import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Horse, HorseRelations} from '../models';

/**
 * Class containing repository methods to communicate with the underlying database
 */
export class HorseRepository extends DefaultCrudRepository<
  Horse,
  typeof Horse.prototype.id,
  HorseRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Horse, dataSource);
  }
}
