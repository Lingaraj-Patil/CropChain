import { Schema, model, Document, Types } from 'mongoose';

export type CropStatus = 'seeded' | 'growing' | 'harvested' | 'packed' | 'delivered';

export interface ICropNFT extends Document {
  farmer: Types.ObjectId;
  cropName: string;
  nftName?: string;
  nftSymbol?: string;
  nftDescription?: string;
  cropType: string;
  seedInformation: string;
  fertilizersUsed: string;
  pesticidesUsed: string;
  irrigationMethod: string;
  cultivationDate: Date;
  harvestDate: Date;
  farmLocation: string;
  organicStatus: 'organic' | 'non-organic';
  image: string;
  metadataUri?: string;
  mintAddress?: string;
  transactionHash?: string;
  verificationBadge: boolean;
  currentStage: CropStatus;
  consumerNotes?: string;
}

const cropNFTSchema = new Schema<ICropNFT>(
  {
    farmer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cropName: { type: String, required: true, trim: true },
    nftName: { type: String, trim: true },
    nftSymbol: { type: String, trim: true, default: 'CROP' },
    nftDescription: {
      type: String,
      trim: true,
      default: 'Blockchain verified agricultural produce from CropChain.',
    },
    cropType: { type: String, required: true, trim: true },
    seedInformation: { type: String, required: true, trim: true },
    fertilizersUsed: { type: String, required: true, trim: true },
    pesticidesUsed: { type: String, required: true, trim: true },
    irrigationMethod: { type: String, required: true, trim: true },
    cultivationDate: { type: Date, required: true },
    harvestDate: { type: Date, required: true },
    farmLocation: { type: String, required: true, trim: true },
    organicStatus: { type: String, enum: ['organic', 'non-organic'], required: true },
    image: { type: String, required: true },
    metadataUri: { type: String },
    mintAddress: { type: String },
    transactionHash: { type: String },
    verificationBadge: { type: Boolean, default: false },
    currentStage: {
      type: String,
      enum: ['seeded', 'growing', 'harvested', 'packed', 'delivered'],
      default: 'seeded',
    },
    consumerNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const CropNFT = model<ICropNFT>('CropNFT', cropNFTSchema);
