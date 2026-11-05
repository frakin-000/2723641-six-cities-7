import { inject, injectable } from 'inversify';

import type { HydratedDocument, Model } from 'mongoose';

import type { CityName } from '../../types/city.type.js';
import { Component } from '../../types/component.enum.js';

import type { CommentEntity } from '../comment/comment.entity.js';

import type { CreateOfferDto } from './dto/create-offer.dto.js';
import type { UpdateOfferDto } from './dto/update-offer.dto.js';
import type { OfferEntity } from './offer.entity.js';
import type { OfferService } from './offer-service.interface.js';

const DEFAULT_OFFER_COUNT = 60;
const PREMIUM_OFFER_COUNT = 3;

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel)
    private readonly offerModel: Model<OfferEntity>,

    @inject(Component.CommentModel)
    private readonly commentModel: Model<CommentEntity>,
  ) {}

  public async find(
    limit = DEFAULT_OFFER_COUNT,
  ): Promise<HydratedDocument<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ publicationDate: -1 })
      .limit(limit)
      .exec();
  }

  public async findById(
    id: string,
  ): Promise<HydratedDocument<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }

  public async create(
    dto: CreateOfferDto,
  ): Promise<HydratedDocument<OfferEntity>> {
    return this.offerModel.create({
      ...dto,
      rating: 0,
      commentCount: 0,
    });
  }

  public async updateById(
    id: string,
    dto: UpdateOfferDto,
  ): Promise<HydratedDocument<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  public async deleteById(
    id: string,
  ): Promise<HydratedDocument<OfferEntity> | null> {
    const offer = await this.offerModel.findByIdAndDelete(id).exec();

    if (offer) {
      await this.commentModel
        .deleteMany({
          offerId: offer._id,
        })
        .exec();
    }

    return offer;
  }

  public async findPremium(
    cityName: CityName,
  ): Promise<HydratedDocument<OfferEntity>[]> {
    return this.offerModel
      .find({
        'city.name': cityName,
        isPremium: true,
      })
      .sort({
        publicationDate: -1,
      })
      .limit(PREMIUM_OFFER_COUNT)
      .exec();
  }

  public async findFavorites(): Promise<HydratedDocument<OfferEntity>[]> {
    return this.offerModel
      .find({
        isFavorite: true,
      })
      .sort({
        publicationDate: -1,
      })
      .exec();
  }

  public async setFavorite(
    id: string,
    isFavorite: boolean,
  ): Promise<HydratedDocument<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        id,
        {
          isFavorite,
        },
        {
          new: true,
        },
      )
      .exec();
  }
}
