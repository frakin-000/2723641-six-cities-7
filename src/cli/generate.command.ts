import {mkdir} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';

import axios from 'axios';
import chalk from 'chalk';

import type {Command} from './command.interface.js';
import type {MockServerData} from '../types/mock-server-data.type.js';

import {OfferGenerator} from './offer.generator.js';
import {offerToTsv} from './offer-to-tsv.js';
import {TsvFileWriter} from './tsv-file-writer.js';

export class GenerateCommand implements Command {
  public readonly name = '--generate';

  public async execute(parameters: string[]): Promise<void> {
    const [countValue, filepath, url] = parameters;

    if (!countValue || !filepath || !url) {
      throw new Error(
        'Использование: --generate <n> <filepath> <url>'
      );
    }

    const count = Number(countValue);

    if (
      !Number.isInteger(count) ||
      count <= 0
    ) {
      throw new Error(
        'Количество предложений должно быть положительным целым числом.'
      );
    }

    const response =
      await axios.get<MockServerData>(url);

    const generator =
      new OfferGenerator(response.data);

    const absolutePath =
      resolve(process.cwd(), filepath);

    await mkdir(dirname(absolutePath), {
      recursive: true
    });

    const writer =
      new TsvFileWriter(absolutePath);

    for (let index = 0; index < count; index++) {
      const offer = generator.generate();

      await writer.write(
        offerToTsv(offer)
      );
    }

    await writer.end();

    console.log(
      chalk.green(
        `Сгенерировано предложений: ${count}`
      )
    );

    console.log(
      chalk.green(
        `Файл сохранён: ${absolutePath}`
      )
    );
  }
}