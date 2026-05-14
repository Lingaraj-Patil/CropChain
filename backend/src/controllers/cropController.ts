import { Response } from 'express';
import process from 'node:process';
import { isValidObjectId } from 'mongoose';
import { CropNFT } from '../models/CropNFT';
import { CropTimeline } from '../models/CropTimeline';
import { Transaction } from '../models/Transaction';
import { AppError } from '../utils/AppError';
import { AuthenticatedRequest } from '../middleware/auth';
import { buildCropNftMetadata } from '../utils/nftMetadata';

const ensureValidCropId = (id: string) => {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid crop ID', 400);
  }
};

export const createCrop = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const farmerId = req.user?.userId;
  if (!farmerId) {
    throw new AppError('Unauthorized', 401);
  }

  const crop = await CropNFT.create({
    farmer: farmerId,
    nftName: req.body.cropName,
    nftSymbol: 'CROP',
    nftDescription: req.body.nftDescription || 'Blockchain verified agricultural produce from CropChain.',
    ...req.body,
  });

  await CropTimeline.create({
    crop: crop._id,
    events: [
      {
        stage: 'seeded',
        title: 'Crop seeded',
        description: 'The crop lifecycle began on the farm.',
        location: crop.farmLocation,
      },
    ],
  });

  if (crop.transactionHash && crop.mintAddress) {
    await Transaction.create({
      crop: crop._id,
      user: farmerId,
      transactionHash: crop.transactionHash,
      mintAddress: crop.mintAddress,
      network: 'devnet',
      status: 'confirmed',
    });
  }

  res.status(201).json({ success: true, message: 'Crop NFT created successfully', data: crop });
};

export const listCrops = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const crops = await CropNFT.find().populate('farmer', 'name email farmName location walletAddress').sort({ createdAt: -1 });
  res.json({ success: true, data: crops });
};

export const getCropById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cropId = String(req.params.id);
  ensureValidCropId(cropId);
  const crop = await CropNFT.findById(cropId).populate('farmer', 'name email farmName location walletAddress bio');
  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  const timeline = await CropTimeline.findOne({ crop: crop._id });
  res.json({ success: true, data: { crop, timeline } });
};

export const updateTimeline = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cropId = String(req.params.id);
  ensureValidCropId(cropId);
  const crop = await CropNFT.findById(cropId);
  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  const { stage, title, description, location } = req.body;

  const timeline = await CropTimeline.findOneAndUpdate(
    { crop: crop._id },
    {
      $push: {
        events: { stage, title, description, location, createdAt: new Date() },
      },
    },
    { new: true, upsert: true }
  );

  crop.currentStage = stage;
  await crop.save();

  res.json({ success: true, message: 'Timeline updated', data: timeline });
};

export const updateBlockchainDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cropId = String(req.params.id);
  ensureValidCropId(cropId);
  const crop = await CropNFT.findById(cropId);
  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  const { mintAddress, transactionHash, metadataUri } = req.body;
  crop.mintAddress = mintAddress;
  crop.transactionHash = transactionHash;
  crop.metadataUri = metadataUri;
  crop.verificationBadge = Boolean(mintAddress && transactionHash);
  await crop.save();

  await Transaction.findOneAndUpdate(
    { crop: crop._id },
    {
      crop: crop._id,
      user: crop.farmer,
      transactionHash,
      mintAddress,
      network: 'devnet',
      status: 'confirmed',
    },
    { upsert: true, new: true }
  );

  res.json({ success: true, message: 'Blockchain details updated', data: crop });
};

export const getCropMetadata = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cropId = String(req.params.id);
  ensureValidCropId(cropId);
  const crop = await CropNFT.findById(cropId).populate('farmer', 'name email farmName location walletAddress bio');
  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  const metadata = buildCropNftMetadata(
    crop,
    (crop.farmer as { name?: string; farmName?: string; location?: string }) || undefined,
    process.env.CLIENT_URL || process.env.API_PUBLIC_URL || ''
  );

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(metadata);
};

export const verifyCrop = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cropId = String(req.params.id);
  ensureValidCropId(cropId);
  const crop = await CropNFT.findById(cropId).populate('farmer', 'name email farmName location walletAddress bio');
  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  const timeline = await CropTimeline.findOne({ crop: crop._id });
  const transaction = await Transaction.findOne({ crop: crop._id });

  res.json({
    success: true,
    data: {
      verified: Boolean(crop.mintAddress && crop.transactionHash),
      crop,
      timeline,
      transaction,
      explorerUrl: crop.transactionHash ? `https://explorer.solana.com/tx/${crop.transactionHash}?cluster=devnet` : null,
      mintUrl: crop.mintAddress ? `https://explorer.solana.com/address/${crop.mintAddress}?cluster=devnet` : null,
    },
  });
};

export const searchCrops = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const query = String(req.query.q || '');
  const crops = await CropNFT.find({
    $or: [
      { cropName: { $regex: query, $options: 'i' } },
      { cropType: { $regex: query, $options: 'i' } },
      { farmLocation: { $regex: query, $options: 'i' } },
    ],
  }).populate('farmer', 'name email farmName location walletAddress');

  res.json({ success: true, data: crops });
};
