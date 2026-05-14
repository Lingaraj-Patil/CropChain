import { z } from 'zod';

export const cropSchema = z.object({
  cropName: z.string().min(2),
  cropType: z.string().min(2),
  seedInformation: z.string().min(2),
  fertilizersUsed: z.string().min(2),
  pesticidesUsed: z.string().min(2),
  irrigationMethod: z.string().min(2),
  cultivationDate: z.string().datetime().or(z.string().min(4)),
  harvestDate: z.string().datetime().or(z.string().min(4)),
  farmLocation: z.string().min(2),
  organicStatus: z.enum(['organic', 'non-organic']),
  image: z.string().min(10),
  metadataUri: z.string().optional(),
  mintAddress: z.string().optional(),
  transactionHash: z.string().optional(),
  consumerNotes: z.string().optional(),
});

export const timelineSchema = z.object({
  stage: z.enum(['seeded', 'growing', 'harvested', 'packed', 'delivered']),
  title: z.string().min(2),
  description: z.string().min(2),
  location: z.string().optional(),
});
