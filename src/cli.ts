#!/usr/bin/env node

import 'reflect-metadata';
import {container} from './container.js';

import chalk from 'chalk';
import {CliApplication} from './cli/cli-application.js';
import {HelpCommand} from './cli/help.command.js';
import {ImportCommand} from './cli/import.command.js';
import {VersionCommand} from './cli/version.command.js';
import {GenerateCommand} from './cli/generate.command.js';
import {Component} from './types/component.enum.js';

const importCommand =
  container.get<ImportCommand>(
    Component.ImportCommand
  );

const cliApplication = new CliApplication([
  new HelpCommand(),
  new VersionCommand(),
  new GenerateCommand(),
  importCommand
]);



try {
  await cliApplication.run(process.argv.slice(2));
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(chalk.red(`Ошибка: ${message}`));
  process.exitCode = 1;
}