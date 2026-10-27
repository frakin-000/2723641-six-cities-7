import {readFile} from 'node:fs/promises';

import chalk from 'chalk';

import type {Command} from './command.interface.js';

type PackageJSON = {
  version: string;
};

export class VersionCommand implements Command {
  public readonly name = '--version';

  public async execute(_parameters: string[]): Promise<void> {
    const packageJsonPath =
      new URL('../../package.json', import.meta.url);

    const content = await readFile(packageJsonPath, {
      encoding: 'utf-8'
    });

    const packageJson = JSON.parse(content) as PackageJSON;

    console.log(
      chalk.green(`Версия приложения: ${packageJson.version}`)
    );
  }
}