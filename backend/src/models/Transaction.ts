import { Schema, model, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  crop: Types.ObjectId;
  user: Types.ObjectId;
  transactionHash: string;
  mintAddress: string;
  network: string;
  status: 'pending' | 'confirmed' | 'failed';
}

const transactionSchema = new Schema<ITransaction>(
  {
    crop: { type: Schema.Types.ObjectId, ref: 'CropNFT', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transactionHash: { type: String, required: true, unique: true },
    mintAddress: { type: String, required: true },
    network: { type: String, default: 'devnet' },
    status: { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'confirmed' },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
