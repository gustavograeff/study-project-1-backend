import { Schema, model, Document } from 'mongoose';

interface IFeed extends Document {
  title: string;
  photo: string;
  userId: string;
}

const FeedSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<IFeed>('Feed', FeedSchema);
