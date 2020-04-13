import Patient from '../../models/patient.model';
import { IRowChecker } from './row-checker.interface';

export class ConsentEmailChecker implements IRowChecker {
  public name = 'IDs where consent \'Y\' but no email adress';

  public async checkRow(data: { [key: string]: string | number }) {
    const patient = await Patient.findById(data['Member ID']);

    if (patient!.consent && !patient!.emailAddress) {
      return data['Member ID'];
    }

    return null;
  }
}
