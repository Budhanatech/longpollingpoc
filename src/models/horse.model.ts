import {Entity, model, property} from '@loopback/repository';

@model()
export class Horse extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  resultId?: string;

  constructor(data?: Partial<Horse>) {
    super(data);
  }
}

export interface HorseRelations {
  // describe navigational properties here
}

export type HorseWithRelations = Horse & HorseRelations;
