import {injectable} from 'inversify';
import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';
import dotenv from 'dotenv';

import type {
  AppConfig,
  Config
} from './config.interface.js';

@injectable()
export class ConfigService implements Config {
  private readonly config;

  constructor() {
    dotenv.config();

    this.checkRequiredEnvironmentVariables();

    convict.addFormats(convictFormatWithValidator);

    this.config = convict<AppConfig>({
      port: {
        doc: 'Порт приложения',
        format: 'port',
        default: 4000,
        env: 'PORT'
      },

      dbHost: {
        doc: 'IP-адрес сервера базы данных',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'DB_HOST'
      },

      salt: {
        doc: 'Соль для хеширования',
        format: String,
        default: '',
        env: 'SALT'
      }
    });

    this.config.validate({
      allowed: 'strict'
    });
  }

  public get<K extends keyof AppConfig>(
    key: K
  ): AppConfig[K] {
    return this.config.get(key) as AppConfig[K];
  }

  private checkRequiredEnvironmentVariables(): void {
    const requiredVariables = [
      'PORT',
      'DB_HOST',
      'SALT'
    ];

    for (const variable of requiredVariables) {
      if (!process.env[variable]) {
        throw new Error(
          `Переменная окружения ${variable} не задана`
        );
      }
    }
  }
}