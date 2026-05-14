# CropChain Seed Data Guide

## Overview
CropChain includes comprehensive seed data for both frontend demo and backend database initialization. This allows you to demonstrate the full application without manually creating crops.

## Frontend Sample Data

**File:** [frontend/src/data/sampleData.ts](../frontend/src/data/sampleData.ts)

Used in demo views and CropDetailsPage when browsing without a real backend.

### Sample Crops Included

| # | Crop Name | Type | Location | Status |
|---|-----------|------|----------|--------|
| 1 | Golden Harvest Basmati | Rice | Punjab | Delivered |
| 2 | Sunrise Valencia Oranges | Citrus | Nagpur, Maharashtra | Packed |
| 3 | Organic Heirloom Tomatoes | Tomato | Bangalore, Karnataka | Harvested |
| 4 | Malabar Black Pepper | Spice | Wayanad, Kerala | Packed |
| 5 | Kashmir Saffron | Saffron | Srinagar, Kashmir | Harvested |
| 6 | Darjeeling Tea Leaves | Tea | Darjeeling, West Bengal | Delivered |
| 7 | Alphonso Mangoes | Mango | Ratnagiri, Maharashtra | Growing |
| 8 | Coconut & Coconut Oil | Coconut | Thiruvananthapuram, Kerala | Packed |

### Sample Farmers

- Aarav Singh (Green Delta Farms, Punjab)
- Meera Deshmukh (Valley Fresh Co., Nagpur)
- Rajesh Kumar (Green Valleys Organic, Bangalore)
- Priya Menon (Spice Route Organic, Wayanad)
- Ghulam Nabi (Kashmir Heritage Farms, Srinagar)
- Deepak Roy (Himalayan Tea Estate, Darjeeling)
- Vikram Sawant (Coastal Orchards, Ratnagiri)
- Lakshmi Nair (Tropical Farms Kerala, Thiruvananthapuram)

## Backend Database Seeding

**Files:**
- [backend/src/seeds/cropSeeds.ts](../backend/src/seeds/cropSeeds.ts)
- [backend/src/scripts/seed.ts](../backend/src/scripts/seed.ts)

### Running the Seed Script

```bash
# Install backend dependencies (if not done)
npm install -w backend

# Run seeding
npm run seed -w backend
```

### What Gets Created

When you run `npm run seed`, it will:

1. **Clear existing data** - Removes any existing sample farmers and crops
2. **Create 8 farmers** - With complete profile information
3. **Create 8 crops** - Linked to the farmers, with full agricultural metadata
4. **Create timelines** - Lifecycle events for each crop

### Seed Data Features

Each seeded crop includes:

**Basic Info:**
- Crop name, type, location
- Farmer association
- Organic status

**Agricultural Details:**
- Seed information
- Fertilizers used
- Pesticides used
- Irrigation method
- Cultivation and harvest dates

**NFT Metadata:**
- NFT name (with batch number)
- NFT symbol
- NFT description
- Image URL (from Unsplash)
- Explorer-compatible metadata structure

**Blockchain Details:**
- Mock mint addresses (valid format, for demo)
- Mock transaction hashes (for demo)
- Metadata URI endpoint references
- Verification badges (all marked as verified)

**Lifecycle:**
- Current stage (seeded, growing, harvested, packed, delivered)
- Timeline events with timestamps

## Using Seed Data

### For Development

```bash
# Terminal 1: Start backend
npm run dev -w backend

# Terminal 2: Run seed script
npm run seed -w backend

# Terminal 3: Start frontend
npm run dev -w frontend
```

Then open http://localhost:5173 and browse the crops!

### For Testing Verification Flow

1. Open Verification page (`/verify`)
2. Use crop IDs from dashboard: `crop-1`, `crop-2`, etc.
3. See mock transaction hashes and mint addresses

### For Checking Metadata

Navigate to:
- `http://localhost:5000/api/metadata/crop-1`
- `http://localhost:5000/api/metadata/crop-2`
- etc.

Or any crop ID created by the seeding script.

## Customizing Seed Data

To add more crops:

1. Edit [backend/src/seeds/cropSeeds.ts](../backend/src/seeds/cropSeeds.ts)
2. Add new crop object to `cropSeeds` array
3. Add farmer if needed to `farmerSeeds` array
4. Run `npm run seed -w backend` to apply

To update frontend demos:

1. Edit [frontend/src/data/sampleData.ts](../frontend/src/data/sampleData.ts)
2. Modify `sampleCrops`, `sampleStats`, or add new data
3. Changes are reflected immediately in dev mode

## Sample Data Values

### Mock Mint Addresses
All follow Solana base58 encoding format (44 characters):
```
BaFfBs4ixRm8W28dh9wpgJNTN14dLevYnY4YfT3jLvXr
CiRmT9fK4nL2jP8sW5vQ1dX6yH3uA7mB9cN4eO2fL5k
```

### Mock Transaction Hashes
Base58 encoded transaction signatures (87-90 characters):
```
4jw6X8kpQ2zYvN5mL7hR9tDxJ3wFkP2vM8nL5sQ6tU7vW9yZ1aB3cD5eF7gH9i
```

### Image URLs
All images from Unsplash for free usage:
- https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6 (Rice)
- https://images.unsplash.com/photo-1547514701-42782101795e (Oranges)
- etc.

## Important Notes

- **Mock blockchain data**: Mint addresses and transaction hashes in seed data are not real; they're for demo purposes
- **No real Solana transactions**: These crops were not actually minted on-chain
- **Clear before seeding**: Each run of `npm run seed` clears previous sample data
- **Frontend uses hardcoded samples**: Frontend sample data is independent of MongoDB seeding

## Next Steps

After seeding:
1. Log in with seed farmer accounts (or create new ones)
2. Create real crop NFTs from the dashboard
3. Mint actual NFTs on Solana Devnet using Phantom Wallet
4. Verify crops on-chain

---

For more details, see [README.md](../README.md)
