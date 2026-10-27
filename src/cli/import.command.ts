import {createReadStream} from 'node:fs';
import {resolve} from 'node:path';
import {createInterface} from 'node:readline';

import chalk from 'chalk';

import {
  inject,
  injectable
} from 'inversify';

import type {Command} from './command.interface.js';

import type {DatabaseClient} from '../shared/database/database-client.interface.js';

import type {UserService} from '../modules/user/user-service.interface.js';
import type {OfferService} from '../modules/offer/offer-service.interface.js';

import {Component} from '../types/component.enum.js';

import {parseOffer} from './offer.parser.js';

@injectable()
export class ImportCommand implements Command {
  public readonly name = '--import';

  constructor(
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,

    @inject(Component.UserService)
    private readonly userService: UserService,

    @inject(Component.OfferService)
    private readonly offerService: OfferService
  ) {}

  public async execute(
    parameters: string[]
  ): Promise<void> {
    const [filepath, databaseUri] = parameters;

    if (!filepath) {
      console.error(
        chalk.red('Необходимо указать путь к TSV-файлу.')
      );

      return;
    }

    if (!databaseUri) {
      console.error(
        chalk.red(
          'Необходимо указать строку подключения к MongoDB.'
        )
      );

      return;
    }

    const absolutePath = resolve(
      process.cwd(),
      filepath
    );

    let importedCount = 0;

    try {
      await this.databaseClient.connect(databaseUri);

      const fileStream = createReadStream(
        absolutePath,
        {
          encoding: 'utf-8'
        }
      );

      const lineReader = createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of lineReader) {
        if (!line.trim()) {
          continue;
        }

        const offer = parseOffer(line);

        let user = await this.userService.findByEmail(
          offer.author.email
        );

        if (!user) {
          user = await this.userService.create(
            offer.author
          );
        }

        const {
          author: _author,
          ...offerData
        } = offer;

        await this.offerService.create({
          ...offerData,
          author: user._id
        });

        importedCount++;
      }

      console.log(
        chalk.green(
          `Успешно импортировано предложений: ${importedCount}`
        )
      );
    } catch (error) {
      console.error(
        chalk.red('Не удалось импортировать данные.')
      );

      if (error instanceof Error) {
        console.error(
          chalk.red(error.message)
        );
      }
    } finally {
      await this.databaseClient.disconnect();
    }
  }
}