import {Entity, hasOne, model, property} from '@loopback/repository';
import {Horse} from './horse.model';

@model()
export class Result extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  event: string;

  @property({
    type: 'number',
    required: true,
  })
  time: number;

  @hasOne(() => Horse)
  horse: Horse;

  constructor(data?: Partial<Result>) {
    super(data);
  }
}

export interface ResultRelations {
  // describe navigational properties here
}

export type ResultWithRelations = Result & ResultRelations;
