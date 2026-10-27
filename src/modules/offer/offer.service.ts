import {
  inject,
  injectable
} from 'inversify';

import type {
  HydratedDocument,
  Model
} from 'mongoose';

import type {OfferEntity} from './offer.entity.js';

import type {
  CreateOffer,
  OfferService
} from './offer-service.interface.js';

import {Component} from '../../types/component.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel)
    private readonly offerModel: Model<OfferEntity>
  ) {}

  public async findById(
    id: string
  ): Promise<HydratedDocument<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .exec();
  }

  public async create(
    offer: CreateOffer
  ): Promise<HydratedDocument<OfferEntity>> {
    return this.offerModel.create(offer);
  }
}