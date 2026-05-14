# Quick Start: Seed Data

## Initialize Sample Data (One-time setup)

```bash
# Install all dependencies
npm install
npm install -w frontend
npm install -w backend

# Set up environment variables
cp backend/.env.example backend/.env  # Edit with your MongoDB URI
cp frontend/.env.example frontend/.env

# Seed database with 8 crops + 8 farmers
npm run seed -w backend

# Start the app
npm run dev
```

## What You Get

✅ **8 realistic crop samples** with full agricultural metadata  
✅ **8 farmer profiles** with location and bio  
✅ **Lifecycle timelines** for each crop  
✅ **Mock blockchain data** (mint addresses, transaction hashes)  
✅ **NFT metadata** compatible with Solana Explorer  
✅ **Beautiful UI** populated with demo data  

## Dashboard Features Available After Seeding

### Consumer Dashboard (`/consumer`)
- Search crops by name, type, location
- View crop details with farmer info
- See lifecycle timeline
- View mock blockchain details

### Farmer Dashboard (`/farmer`)
- Create new crop NFTs
- Update crop lifecycle stages
- See all your crops
- Get NFT preview with metadata

### Verification Page (`/verify`)
- Paste crop ID to verify
- See NFT metadata
- Check Solana Explorer links
- Verify authenticity

## Crop IDs for Testing

Use any of these IDs on verification page:
- Use real IDs from dashboard after seeding
- Or reference sample data in [frontend/src/data/sampleData.ts](frontend/src/data/sampleData.ts)

## Clear & Reseed

To reset all data and reseed:

```bash
npm run seed -w backend
```

This automatically clears old sample farmers/crops and recreates them.

## Environment Variables Required

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cropchain
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
API_PUBLIC_URL=http://localhost:5000
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:5000
VITE_METADATA_BASE_URL=http://localhost:5000
VITE_SOLANA_CLUSTER=devnet
```

## Test User Logins (After Seeding)

Use any farmer's email to test:
- aarav.singh@farmmail.com
- meera.deshmukh@farmmail.com
- rajesh.kumar@farmmail.com
- (passwords: set during seeding or test login flow)

## API Endpoints Available

```
GET  /api/crops                    # List all crops
GET  /api/crops/:id                # Get crop details
GET  /api/crops/:id/metadata       # Get NFT metadata
GET  /api/crops/search?q=          # Search crops
GET  /api/crops/:id/verify         # Verify crop authenticity
POST /api/crops                    # Create new crop (requires auth)
PATCH /api/crops/:id/timeline      # Update lifecycle
```

## Troubleshooting

**MongoDB connection fails?**
- Check MONGODB_URI in .env
- Ensure MongoDB is running or Atlas cluster is accessible

**Seed script doesn't run?**
- Ensure backend dependencies are installed: `npm install -w backend`
- Check NODE environment: should be development/test

**No crops showing in dashboard?**
- Verify seeding succeeded (check console output)
- Clear browser cache and reload
- Check MongoDB connection

## Learn More

- [SEED_DATA.md](SEED_DATA.md) - Detailed seed data documentation
- [README.md](README.md) - Project overview and setup
- [frontend/src/data/sampleData.ts](frontend/src/data/sampleData.ts) - Frontend demo data
- [backend/src/seeds/cropSeeds.ts](backend/src/seeds/cropSeeds.ts) - Backend seed data

---

Ready to go! 🚀
