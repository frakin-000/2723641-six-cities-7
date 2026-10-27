import {Container} from 'inversify';

import {Application} from './application/application.js';

import type {Config} from './shared/config/config.interface.js';
import {ConfigService} from './shared/config/config.service.js';

import type {Logger} from './shared/logger/logger.interface.js';
import {PinoLogger} from './shared/logger/pino.logger.js';

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