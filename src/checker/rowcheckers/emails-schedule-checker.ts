import { IEmail } from '../../models/email.model';
import Patient from '../../models/patient.model';
import { IRowChecker } from './row-checker.interface';

export class EmailsScheduleChecker implements IRowChecker {
  public name = "IDs where consent 'Y' but no emails created";

  public async checkRow(data: { [key: string]: string | number }) {
    const patient = await Patient.findById(data['Member ID']).populate('emails');

    if (patient!.consent) {
      const emails: IEmail[] = patient!.emails;
      const firstDate = emails[0].date;
      if (
        firstDate.getTime() + 1 * 24 * 60 * 60 * 1000 !== emails[1]!.date.getTime() ||
        firstDate.getTime() + 2 * 24 * 60 * 60 * 1000 !== emails[2]!.date.getTime() ||
        firstDate.getTime() + 3 * 24 * 60 * 60 * 1000 !== emails[3]!.date.getTime()
      ) {
        return data['Member ID'];
      }
    }

    return null;
  }
}
