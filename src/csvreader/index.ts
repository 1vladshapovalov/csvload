import config from 'config';
import fs from 'fs';
import mongoose from 'mongoose';
import { parse } from 'papaparse';
import { Checker } from '../checker';
import { IProcessor } from '../common/processor.interface';
import { CSVWriter } from '../csvwriter/';

export class CSVReader {
  private readonly mongoURL = `mongodb://${config.get('db.mongo.host')}:${config.get(
    'db.mongo.port',
  )}/${config.get('db.mongo.database')}`;

  private readonly path: string = config.get('csvFilePath');

  public async read(processor: IProcessor) {
    await mongoose.connect(this.mongoURL, {
      keepAlive: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!fs.existsSync(this.path)) {
      throw new Error(`File ${this.path} doesn't exist`);
    }

    const file = await fs.createReadStream(this.path);
    parse(file, {
      header: true,

      async step(row, parser) {
        parser.pause();

        await processor.processRow(row);

        parser.resume();
      },

      async complete() {
        await mongoose.disconnect();
        if (processor instanceof Checker) {
          await CSVWriter.writeCsvReport(processor.reportResults);
        }
      },
    });
  }
}
