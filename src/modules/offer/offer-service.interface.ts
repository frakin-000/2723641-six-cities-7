import type { HydratedDocument } from 'mongoose';

import type { CityName } from '../../types/city.type.js';

import type { CreateOfferDto } from './dto/create-offer.dto.js';
import type { UpdateOfferDto } from './dto/update-offer.dto.js';
import type { OfferEntity } from './offer.entity.js';

export interface OfferService {
  find(limit?: number): Promise<HydratedDocument<OfferEntity>[]>;

  findById(id: string): Promise<HydratedDocument<OfferEntity> | null>;

  create(dto: CreateOfferDto): Promise<HydratedDocument<OfferEntity>>;

  updateById(
    id: string,
    dto: UpdateOfferDto,
  ): Promise<HydratedDocument<OfferEntity> | null>;

  deleteById(id: string): Promise<HydratedDocument<OfferEntity> | null>;

  findPremium(cityName: CityName): Promise<HydratedDocument<OfferEntity>[]>;

  findFavorites(): Promise<HydratedDocument<OfferEntity>[]>;

  setFavorite(
    id: string,
    isFavorite: boolean,
  ): Promise<HydratedDocument<OfferEntity> | null>;
}
