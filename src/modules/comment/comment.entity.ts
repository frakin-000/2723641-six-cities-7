import type { Types } from 'mongoose';

export type CommentEntity = {
  text: string;
  publicationDate: Date;
  rating: number;

  author: Types.ObjectId;
  offerId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
};
