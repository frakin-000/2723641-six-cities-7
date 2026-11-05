import { inject, injectable } from 'inversify';

import type { HydratedDocument, Model } from 'mongoose';
import { Types } from 'mongoose';

import { Component } from '../../types/component.enum.js';

import type { OfferEntity } from '../offer/offer.entity.js';

import type { CommentEntity } from './comment.entity.js';
import type { CommentService } from './comment-service.interface.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';

type RatingResult = {
  _id: null;
  commentCount: number;
  rating: number;
};

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: Model<CommentEntity>,

    @inject(Component.OfferModel)
    private readonly offerModel: Model<OfferEntity>,
  ) {}

  public async findByOfferId(
    offerId: string,
  ): Promise<HydratedDocument<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ publicationDate: -1 })
      .limit(50)
      .exec();
  }

  public async create(
    dto: CreateCommentDto,
  ): Promise<HydratedDocument<CommentEntity>> {
    const comment = await this.commentModel.create({
      ...dto,
      publicationDate: new Date(),
    });

    await this.recalculateOffer(dto.offerId.toString());

    return comment;
  }

  public async deleteByOfferId(offerId: string): Promise<void> {
    await this.commentModel.deleteMany({ offerId }).exec();
  }

  private async recalculateOffer(offerId: string): Promise<void> {
    const [result] = await this.commentModel.aggregate<RatingResult>([
      {
        $match: {
          offerId: new Types.ObjectId(offerId),
        },
      },
      {
        $group: {
          _id: null,
          commentCount: {
            $sum: 1,
          },
          rating: {
            $avg: '$rating',
          },
        },
      },
    ]);

    if (!result) {
      await this.offerModel
        .findByIdAndUpdate(offerId, {
          commentCount: 0,
          rating: 0,
        })
        .exec();

      return;
    }

    await this.offerModel
      .findByIdAndUpdate(offerId, {
        commentCount: result.commentCount,
        rating: Number(result.rating.toFixed(1)),
      })
      .exec();
  }
}
