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
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.fullName = function getFullName(): string {
  return `${this.firstName} ${this.lastName}`;
};

export default model<IUser>('User', UserSchema);
