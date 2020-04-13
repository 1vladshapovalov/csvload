import mongoose, { Document, Schema } from 'mongoose';
import {IPatient} from './patient.model';

export interface IEmail extends Document {
  subject: string;
  body: string;
  date: Date;
  patient: IPatient['_id'];
}

const EmailSchema: Schema = new Schema({
  subject: {type: String, required: true},
  body: {type: String, required: true},
  patient: {type: String, ref: 'Patients'},
  date: {type: Date, required: true}
});

export default mongoose.model<IEmail>('Email', EmailSchema);
