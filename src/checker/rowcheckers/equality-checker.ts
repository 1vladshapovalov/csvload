import Patient from '../../models/patient.model';
import { IRowChecker } from './row-checker.interface';

export class EqualityChecker implements IRowChecker {
  public name = 'IDs not equal mongo and file';

  public async checkRow(data: { [key: string]: string | number }) {
    const patient = await Patient.findById(data['Member ID']);

    if (
      !patient ||
      patient.programIdentifier !== data['Program Identifier'] ||
      patient.dataSource !== data['Data Source'] ||
      patient.cardNumber !== data['Card Number'] ||
      patient.firstName !== data['First Name'] ||
      patient.lastName !== data['Last Name'] ||
      patient.dateOfBirth !== data['Date of Birth'] ||
      patient.firstAddress !== data['Address 1'] ||
      patient.secondAddress !== data['Address 2'] ||
      patient.city !== data['City'] ||
      patient.state !== data['State'] ||
      patient.zipCode !== data['Zip code'] ||
      (patient.telephoneNumber === null ? '' : patient.telephoneNumber) !==
        data['Telephone number'] ||
      patient.emailAddress !== data['Email Address'] ||
      patient.consent !== (data['CONSENT'] === 'Y' ? true : false) ||
      patient.mobilePhone !== data['Mobile Phone']
    ) {

      return data['Member ID'];
    }

    return null;
  }
}
