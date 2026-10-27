import {
  inject,
  injectable
} from 'inversify';

import type {
  HydratedDocument,
  Model
} from 'mongoose';

import type {User} from '../../types/user.type.js';
import type {UserEntity} from './user.entity.js';
import type {UserService} from './user-service.interface.js';

import {Component} from '../../types/component.enum.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.UserModel)
    private readonly userModel: Model<UserEntity>
  ) {}

  public async findById(
    id: string
  ): Promise<HydratedDocument<UserEntity> | null> {
    return this.userModel
      .findById(id)
      .exec();
  }

  public async findByEmail(
    email: string
  ): Promise<HydratedDocument<UserEntity> | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async create(
    user: User
  ): Promise<HydratedDocument<UserEntity>> {
    return this.userModel.create(user);
  }
}