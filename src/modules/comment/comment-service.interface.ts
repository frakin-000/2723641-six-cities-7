import type { HydratedDocument } from 'mongoose';

import type { CommentEntity } from './comment.entity.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  findByOfferId(offerId: string): Promise<HydratedDocument<CommentEntity>[]>;

  create(dto: CreateCommentDto): Promise<HydratedDocument<CommentEntity>>;

  deleteByOfferId(offerId: string): Promise<void>;
}
