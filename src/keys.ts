import {BindingKey} from '@loopback/core';
import {ResultService} from './services/result.service';

export const RESULT_SERVICE = BindingKey.create<ResultService>(
  'services.CachingService',
);
