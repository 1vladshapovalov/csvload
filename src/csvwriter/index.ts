import config from 'config';
import fs from 'fs';

export class CSVWriter {
  public static writeCsvReport(report: Map<string, string[]>) {
    const headers = Array.from(report.keys()).join('|');
    const row = Array.from(report.values()).join('|');
    const content = headers + '\n' + row;

    fs.writeFile(config.get('reportFilePath'), content, err => {
      if (err) {
        throw err;
      }
    });
  }
}
