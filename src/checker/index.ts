import { IProcessor } from '../common/processor.interface';
import { ConsentEmailChecker } from './rowcheckers/constent-email-checker';
import { EmailsCreatedChecker } from './rowcheckers/emails-created-checker';
import { EmailsScheduleChecker } from './rowcheckers/emails-schedule-checker';
import { EqualityChecker } from './rowcheckers/equality-checker';
import { FirstNameChecker } from './rowcheckers/first-name-checker';
import { IRowChecker } from './rowcheckers/row-checker.interface';

export class Checker implements IProcessor {
  public reportResults = new Map<string, string[]>();

  public checkers: IRowChecker[] = [];

  constructor() {
    this.checkers = [
      new EqualityChecker(),
      new FirstNameChecker(),
      new ConsentEmailChecker(),
      new EmailsCreatedChecker(),
      new EmailsScheduleChecker()
    ];

    for (const checker of this.checkers) {
      this.reportResults.set(checker.name, []);
    }
  }

  public async processRow(row: any) {
    const data: { [key: string]: string | number } = row.data;

    for (const checker of this.checkers) {
      const result = await checker.checkRow(data);
      if (result) {
        const ids = this.reportResults.get(checker.name);
        ids!.push(data['Member ID'] as string);
        this.reportResults.set(checker.name, ids!);
      }
    }
  }
}
