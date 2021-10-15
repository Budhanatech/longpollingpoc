import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {RESULT_SERVICE} from './keys';
import {ResultService} from './services';

export {ApplicationConfig};

/**
 * Main application class containing different components and servers
 */
export class DemoApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.projectRoot = __dirname;
    this.add(createBindingFromClass(ResultService, {key: RESULT_SERVICE}));
  }
}
