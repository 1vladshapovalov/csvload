import { IProcessor } from '../common/processor.interface';
import Email, { IEmail } from '../models/email.model';
import Patient, { IPatient } from '../models/patient.model';

export class Loader implements IProcessor {
  constructor() {
    this.cleanCollections();
  }

  public async processRow(row: any) {
    const data: { [key: string]: string | number } = row.data;
    const _id = data['Member ID'] as string;
    if (!_id) {
      return;
    }
    const patient: IPatient = new Patient({
      _id,
      programIdentifier: data['Program Identifier'],
      dataSource: data['Data Source'],
      cardNumber: data['Card Number'],
      firstName: data['First Name'],
      lastName: data['Last Name'],
      dateOfBirth: data['Date of Birth'],
      firstAddress: data['Address 1'],
      secondAddress: data['Address 2'],
      city: data['City'],
      state: data['State'],
      zipCode: data['Zip code'],
      telephoneNumber: data['Telephone number'],
      emailAddress: data['Email Address'],
      consent: data['CONSENT'] === 'Y' ? true : false,
      mobilePhone: data['Mobile Phone'],
    });
    await patient.save();

    if (patient.consent) {
      const emails = this.generateEmailsForPatient(patient);
      for (const email of emails) {
        await email.save();
        patient.emails.push(email);
      }
    }

    await patient.save();
  }

  public generateEmailsForPatient(patient: IPatient) {
    const emails: IEmail[] = [];
    const currentDate = new Date();

    emails.push(
      new Email({
        subject: 'First email subject',
        body: 'First email body',
        date: currentDate,
        patient,
      }),
      new Email({
        subject: 'Second email subject',
        body: 'Second email body',
        date: new Date(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000),
        patient,
      }),
      new Email({
        subject: 'Third email subject',
        body: 'Third email body',
        date: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000),
        patient,
      }),
      new Email({
        subject: 'Fourth email subject',
        body: 'Fourth email body',
        date: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000),
        patient,
      }),
    );

    return emails;
  }

  private async cleanCollections() {
    await Patient.deleteMany({});
    await Email.deleteMany({});
  }
}
