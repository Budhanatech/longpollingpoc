import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Result, ResultRelations, Horse} from '../models';
import {HorseRepository} from './horse.repository';

export class ResultRepository extends DefaultCrudRepository<
  Result,
  typeof Result.prototype.id,
  ResultRelations
> {
  public readonly horse: HasOneRepositoryFactory<
    Horse,
    typeof Result.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('HorseRepository')
    protected horseRepositoryGetter: Getter<HorseRepository>,
  ) {
    super(Result, dataSource);
    this.horse = this.createHasOneRepositoryFactoryFor(
      'horse',
      horseRepositoryGetter,
    );
    this.registerInclusionResolver('horse', this.horse.inclusionResolver);
  }
}
