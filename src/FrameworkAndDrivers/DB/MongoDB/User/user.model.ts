import mongoose, { Schema, Document } from 'mongoose';
import UserEntity from '../../../../Components/User/Entities/UserEntity';

export interface IUserModel extends Document, UserEntity {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<IUserModel>('User', UserSchema);
