import mongoose, { Document, Schema } from 'mongoose';
import { IEmail } from './email.model';

export interface IPatient extends Document {
  programIdentifier?: string;
  dataSource?: string;
  cardNumber?: string;
  _id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  firstAddress?: string;
  secondAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  telephoneNumber?: string;
  emailAddress?: string;
  consent?: boolean;
  mobilePhone?: string;
  emails: [IEmail['_id']];
}

const PatientSchema: Schema = new Schema({
  programIdentifier: { type: String },
  dataSource: { type: String },
  cardNumber: { type: String },
  _id: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: String },
  firstAddress: { type: String },
  secondAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  telephoneNumber: { type: String },
  emailAddress: { type: String },
  consent: { type: Boolean },
  mobilePhone: { type: String },
  emails: [{ type: Schema.Types.ObjectId, ref: 'Email' }]
});

export default mongoose.model<IPatient>('Patients', PatientSchema);
