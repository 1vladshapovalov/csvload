import Patient from '../../models/patient.model';
import { IRowChecker } from './row-checker.interface';

export class FirstNameChecker implements IRowChecker {
  public name = 'IDs where first name missing';

  public async checkRow(data: { [key: string]: string | number }) {
    const patient = await Patient.findById(data['Member ID']);

    if (!patient!.firstName) {
      return data['Member ID'];
    }

    return null;
  }
}
