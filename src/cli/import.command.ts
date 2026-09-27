import {createReadStream} from 'node:fs';
import {resolve} from 'node:path';
import {createInterface} from 'node:readline';

import chalk from 'chalk';

import type {Command} from './command.interface.js';
import {parseOffer} from './offer.parser.js';

export class ImportCommand implements Command {
  public readonly name = '--import';

  public async execute(parameters: string[]): Promise<void> {
    const [filepath] = parameters;

  if (!filepath) {
    console.error(
      chalk.red('Необходимо указать путь к TSV-файлу.')
    );
    return;
  }

    const absolutePath = resolve(process.cwd(), filepath);

    const fileStream = createReadStream(absolutePath, {
      encoding: 'utf-8'
    });

    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let importedCount = 0;

    try {
      for await (const line of readline) {
        if (!line.trim()) {
          continue;
        }

        const offer = parseOffer(line);

        console.log(chalk.cyan('Получено предложение:'));
        console.log(offer);

        importedCount++;
      }

      console.log(
        chalk.green(`Успешно импортировано предложений: ${importedCount}`)
      );
    } catch (error) {
      console.error(chalk.red('Не удалось импортировать данные.'));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}