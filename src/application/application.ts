import {
  inject,
  injectable
} from 'inversify';

import type {Config} from '../shared/config/config.interface.js';
import type {Logger} from '../shared/logger/logger.interface.js';

import {Component} from '../types/component.enum.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,

    @inject(Component.Config)
    private readonly config: Config
  ) {}

  public init(): void {
    this.logger.info(
      'Приложение инициализировано'
    );

    const port = this.config.get('port');

    this.logger.info(
      `Порт приложения: ${port}`
    );
  }
}