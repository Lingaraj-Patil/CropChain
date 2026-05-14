import { Schema, model, Document, Types } from 'mongoose';

export interface ITimelineEvent {
  stage: 'seeded' | 'growing' | 'harvested' | 'packed' | 'delivered';
  title: string;
  description: string;
  location?: string;
  createdAt: Date;
}

export interface ICropTimeline extends Document {
  crop: Types.ObjectId;
  events: ITimelineEvent[];
}

const timelineEventSchema = new Schema<ITimelineEvent>(
  {
    stage: {
      type: String,
      enum: ['seeded', 'growing', 'harvested', 'packed', 'delivered'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const cropTimelineSchema = new Schema<ICropTimeline>(
  {
    crop: { type: Schema.Types.ObjectId, ref: 'CropNFT', required: true, unique: true },
    events: { type: [timelineEventSchema], default: [] },
  },
  { timestamps: true }
);

export const CropTimeline = model<ICropTimeline>('CropTimeline', cropTimelineSchema);
