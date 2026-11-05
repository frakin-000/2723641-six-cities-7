import { model, Schema } from 'mongoose';

import type { CommentEntity } from './comment.entity.js';

const commentSchema = new Schema<CommentEntity>(
  {
    text: {
      type: String,
      required: true,
    },

    publicationDate: {
      type: Date,
      default: Date.now,
    },

    rating: {
      type: Number,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    offerId: {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'comments',
  },
);

export const CommentModel = model<CommentEntity>('Comment', commentSchema);
