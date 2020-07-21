import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fullName(): string;
}

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String
  },
  {
    timestamps: true
  }
);

UserSchema.methods.fullName = function getFullName(): string {
  return `${this.firstName} ${this.lastName}`;
};

export default model<IUser>('User', UserSchema);
