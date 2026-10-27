import type {
  HydratedDocument,
  Types
} from 'mongoose';

import type {OfferInput} from '../../types/offer.type.js';
import type {OfferEntity} from './offer.entity.js';

export type CreateOffer = Omit<
  OfferInput,
  'author'
> & {
  author: Types.ObjectId;
};

export interface OfferService {
  findById(
    id: string
  ): Promise<HydratedDocument<OfferEntity> | null>;

  create(
    offer: CreateOffer
  ): Promise<HydratedDocument<OfferEntity>>;
}