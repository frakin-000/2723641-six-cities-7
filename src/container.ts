import {Container} from 'inversify';

import {Application} from './application/application.js';

import type {DatabaseClient} from './shared/database/database-client.interface.js';
import {MongoDatabaseClient} from './shared/database/mongo.database-client.js';

import type {Config} from './shared/config/config.interface.js';
import {ConfigService} from './shared/config/config.service.js';

import type {Logger} from './shared/logger/logger.interface.js';
import {PinoLogger} from './shared/logger/pino.logger.js';

import type {UserEntity} from './modules/user/user.entity.js';
import {UserModel} from './modules/user/user.model.js';
import type {UserService} from './modules/user/user-service.interface.js';
import {DefaultUserService} from './modules/user/user.service.js';

import type {OfferEntity} from './modules/offer/offer.entity.js';
import {OfferModel} from './modules/offer/offer.model.js';
import type {OfferService} from './modules/offer/offer-service.interface.js';
import {DefaultOfferService} from './modules/offer/offer.service.js';

import type {Model} from 'mongoose';

import {ImportCommand} from './cli/import.command.js';

import {Component} from './types/component.enum.js';

export const container = new Container();

container
  .bind<Application>(Component.Application)
  .to(Application)
  .inSingletonScope();

container
  .bind<Logger>(Component.Logger)
  .to(PinoLogger)
  .inSingletonScope();

container
  .bind<Config>(Component.Config)
  .to(ConfigService)
  .inSingletonScope();

container
  .bind<DatabaseClient>(Component.DatabaseClient)
  .to(MongoDatabaseClient)
  .inSingletonScope();

container
  .bind<Model<UserEntity>>(Component.UserModel)
  .toConstantValue(UserModel);

container
  .bind<UserService>(Component.UserService)
  .to(DefaultUserService)
  .inSingletonScope();

container
  .bind<Model<OfferEntity>>(Component.OfferModel)
  .toConstantValue(OfferModel);

container
  .bind<OfferService>(Component.OfferService)
  .to(DefaultOfferService)
  .inSingletonScope();

container
  .bind<ImportCommand>(Component.ImportCommand)
  .to(ImportCommand);