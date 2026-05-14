import { Request, Response } from 'express';
import process from 'node:process';
import { isValidObjectId } from 'mongoose';
import { CropNFT } from '../models/CropNFT';
import { AppError } from '../utils/AppError';
import { buildCropNftMetadata } from '../utils/nftMetadata';

export const getMetadataByCropId = async (req: Request, res: Response): Promise<void> => {
  const cropId = String(req.params.id);

  if (!isValidObjectId(cropId)) {
    throw new AppError('Invalid crop ID', 400);
  }

  const crop = await CropNFT.findById(cropId).populate('farmer', 'name farmName location');
  if (!crop) {
    throw new AppError('Crop not found', 404);
  }

  const metadata = buildCropNftMetadata(
    crop,
    (crop.farmer as { name?: string; farmName?: string; location?: string }) || undefined,
    process.env.CLIENT_URL || process.env.API_PUBLIC_URL || ''
  );

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json(metadata);
};
