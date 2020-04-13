import Email from '../../models/email.model';
import Patient from '../../models/patient.model';
import { IRowChecker } from './row-checker.interface';

export class EmailsCreatedChecker implements IRowChecker {
  public name = "IDs where consent 'Y' but no emails created";

  public async checkRow(data: { [key: string]: string | number }) {
    const patient = await Patient.findById(data['Member ID']);

    if (patient!.consent) {
      const emails = Email.find({ patient: patient!._id });
      if (!emails) {
        return data['Member ID'];
      }
    }

    return null;
  }
}
