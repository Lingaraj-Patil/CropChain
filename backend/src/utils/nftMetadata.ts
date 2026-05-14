import type { ICropNFT } from '../models/CropNFT';

type FarmerShape = {
  name?: string;
  farmName?: string;
  location?: string;
};

export interface SolanaNftMetadataAttribute {
  trait_type: string;
  value: string;
}

export interface SolanaNftMetadataPayload {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
  attributes: SolanaNftMetadataAttribute[];
  properties: {
    category: 'image';
    files: Array<{ uri: string; type: string }>;
  };
}

const toIso = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
};

const withNoTrailingSlash = (value: string): string => value.replace(/\/$/, '');

/**
 * Solana Explorer reads metadata by fetching the URI from the on-chain
 * Metadata Account. This builder guarantees a stable JSON shape compatible
 * with Metaplex Token Metadata so minted NFTs do not appear as "Unknown Token".
 */
export const buildCropNftMetadata = (
  crop: ICropNFT,
  farmer?: FarmerShape,
  appBaseUrl = process.env.CLIENT_URL || process.env.API_PUBLIC_URL || ''
): SolanaNftMetadataPayload => {
  const farmerName = farmer?.name || farmer?.farmName || 'Unknown Farmer';
  const resolvedBaseUrl = appBaseUrl ? withNoTrailingSlash(appBaseUrl) : '';
  const cropId = String(crop._id);
  const externalUrl = resolvedBaseUrl ? `${resolvedBaseUrl}/crops/${cropId}` : `/crops/${cropId}`;

  const name = crop.nftName || crop.cropName;
  const symbol = crop.nftSymbol || 'CROP';
  const description = crop.nftDescription || 'Blockchain verified agricultural produce from CropChain.';

  const attributes: SolanaNftMetadataAttribute[] = [
    { trait_type: 'Farmer Name', value: farmerName },
    { trait_type: 'Crop Type', value: crop.cropType },
    { trait_type: 'Farm Location', value: crop.farmLocation },
    { trait_type: 'Organic Status', value: crop.organicStatus },
    { trait_type: 'Harvest Date', value: toIso(crop.harvestDate) },
    { trait_type: 'Fertilizers Used', value: crop.fertilizersUsed },
  ];

  return {
    name,
    symbol,
    description,
    image: crop.image,
    external_url: externalUrl,
    attributes,
    properties: {
      category: 'image',
      files: [
        {
          uri: crop.image,
          type: 'image/png',
        },
      ],
    },
  };
};
