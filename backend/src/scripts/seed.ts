/**
 * Database seeding script for CropChain development.
 * 
 * Usage:
 *   npx tsx src/scripts/seed.ts
 * 
 * This script:
 * - Connects to MongoDB
 * - Creates sample farmers
 * - Creates sample crops linked to farmers
 * - Creates sample timelines for crops
 */

import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import { User } from '../models/User';
import { CropNFT } from '../models/CropNFT';
import { CropTimeline } from '../models/CropTimeline';
import { farmerSeeds, cropSeeds } from '../seeds/cropSeeds';

dotenv.config();

const seed = async (): Promise<void> => {
  try {
    await connectDB();
    console.log('📊 Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing farmers and crops...');
    await User.deleteMany({ email: { $in: farmerSeeds.map((f) => f.email) } });
    await CropNFT.deleteMany({});
    await CropTimeline.deleteMany({});

    // Create farmers
    console.log(`👨‍🌾 Creating ${farmerSeeds.length} sample farmers...`);
    const farmers = await User.insertMany(farmerSeeds);
    console.log(`✅ Created ${farmers.length} farmers`);

    // Create crops linked to farmers
    console.log(`🌾 Creating ${cropSeeds.length} sample crops...`);
    const cropsWithFarmers = cropSeeds.map((crop, index) => ({
      ...crop,
      farmer: farmers[index % farmers.length]._id,
    }));
    const crops = await CropNFT.insertMany(cropsWithFarmers);
    console.log(`✅ Created ${crops.length} crops`);

    // Create sample timelines
    console.log('📈 Creating sample crop timelines...');
    const timelines = crops.map((crop) => ({
      crop: crop._id,
      events: [
        {
          stage: 'seeded',
          title: 'Crop Seeded',
          description: `${crop.cropName} seeds planted in prepared fields`,
          location: crop.farmLocation,
        },
        {
          stage: 'growing',
          title: 'Growing Phase',
          description: 'Seedlings sprouted and irrigation started',
          location: crop.farmLocation,
        },
        {
          stage: 'harvested',
          title: 'Harvest Complete',
          description: 'Crop is ready and harvesting started',
          location: crop.farmLocation,
        },
      ],
    }));
    await CropTimeline.insertMany(timelines);
    console.log(`✅ Created ${timelines.length} timelines`);

    console.log('\n✨ Seed data created successfully!');
    console.log(`
📋 Summary:
  - Farmers: ${farmers.length}
  - Crops: ${crops.length}
  - Timelines: ${timelines.length}

🚀 You can now run 'npm run dev' to start the dev server with sample data.
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

void seed();
