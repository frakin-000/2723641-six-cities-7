import chalk from 'chalk';
import type {Command} from './command.interface.js';

const HELP_MESSAGE = `
${chalk.bold.cyan('Программа для подготовки данных REST API сервера.')}

${chalk.yellow('Пример:')}
  npm run cli -- --<command> [--arguments]

${chalk.yellow('Команды:')}

  ${chalk.green('--version')}                    выводит номер версии
  ${chalk.green('--help')}                       печатает этот текст
  ${chalk.green('--import <path>')}              импортирует данные из TSV
  ${chalk.green('--generate <n> <path> <url>')}  генерирует тестовые данные
  `;

export class HelpCommand implements Command {
  public readonly name = '--help';

  public execute(_parameters: string[]): void {
    console.log(HELP_MESSAGE);
  }
}