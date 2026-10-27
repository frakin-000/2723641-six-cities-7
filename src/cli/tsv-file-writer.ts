import {createWriteStream} from 'node:fs';
import {once} from 'node:events';

export class TsvFileWriter {
  private readonly stream;

  constructor(filepath: string) {
    this.stream = createWriteStream(filepath, {
      encoding: 'utf-8'
    });
  }

  public async write(line: string): Promise<void> {
    const canContinue = this.stream.write(`${line}\n`);

    if (!canContinue) {
      await once(this.stream, 'drain');
    }
  }

  public async end(): Promise<void> {
    this.stream.end();

    await once(this.stream, 'finish');
  }
}