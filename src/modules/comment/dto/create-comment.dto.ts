import type { Types } from 'mongoose';

export type CreateCommentDto = {
  text: string;
  rating: number;

  author: Types.ObjectId;
  offerId: Types.ObjectId;
};
