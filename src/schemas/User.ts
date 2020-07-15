import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email?: String;
  firstName: String;
  lastName: String;
  fullName(): String;
}

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.fullName = function (): String {
  return this.firstName + ' ' + this.lastName;
};

export default model<IUser>('User', UserSchema);
