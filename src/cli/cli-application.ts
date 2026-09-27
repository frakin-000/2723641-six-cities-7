import chalk from 'chalk';
import type {Command} from './command.interface.js';

export class CliApplication {
  private readonly commands = new Map<string, Command>();

  constructor(commands: Command[]) {
    for (const command of commands) {
      this.commands.set(command.name, command);
    }
  }

  public async run(argumentsList: string[]): Promise<void> {
    const [commandName = '--help', ...parameters] = argumentsList;

    const command = this.commands.get(commandName);

    if (!command) {
      console.error(chalk.red(`Неизвестная команда: ${commandName}`));

      const helpCommand = this.commands.get('--help');
      await helpCommand?.execute([]);

      return;
    }

    await command.execute(parameters);
  }
}