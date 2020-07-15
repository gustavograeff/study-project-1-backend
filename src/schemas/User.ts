import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email?: string;
  firstName: string;
  lastName: string;
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
