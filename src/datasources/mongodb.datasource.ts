import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config from '../config';

const dbconfig = {
  name: 'mongodb',
  connector: 'mongodb',
  url: config.DB_URL,
  host: config.DB_HOST,
  port: 27017,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: 'gwdemov2',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = dbconfig;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = dbconfig,
  ) {
    super(dsConfig);
  }
}
