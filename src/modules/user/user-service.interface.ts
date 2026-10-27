import type {HydratedDocument} from 'mongoose';

import type {User} from '../../types/user.type.js';
import type {UserEntity} from './user.entity.js';

export interface UserService {
  findById(
    id: string
  ): Promise<HydratedDocument<UserEntity> | null>;

  findByEmail(
    email: string
  ): Promise<HydratedDocument<UserEntity> | null>;

  create(
    user: User
  ): Promise<HydratedDocument<UserEntity>>;
}