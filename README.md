# 🌾 CropChain – NFT-Based Agricultural Traceability System

> **Blockchain-verified agricultural produce traceability using Solana NFTs**

A full-stack application that enables farmers to mint NFTs for their crops, track the complete lifecycle from cultivation to consumer delivery, and allow consumers to verify authenticity on the blockchain using Solana Devnet.

## ✨ Features

### For Farmers
- 🌱 **Crop Registration** - Register crops with complete agricultural metadata
- 📸 **NFT Minting** - Mint NFTs on Solana Devnet using Phantom Wallet and Metaplex SDK
- 📊 **Lifecycle Management** - Track crops from seeded → growing → harvested → packed → delivered
- 🔐 **Blockchain Verification** - Get immutable proof of authenticity on Solana
- 📈 **Dashboard** - View all minted crops with blockchain details

### For Consumers  
- 🔍 **Crop Verification** - Verify crop authenticity using crop ID
- 📋 **Full Traceability** - View complete crop journey and farmer details
- 🌍 **Solana Explorer Links** - Access NFT details directly on Solana blockchain
- ✅ **Verification Badge** - See blockchain-verified badge for authenticated crops

### Technical Features
- ✅ **Metaplex Token Metadata** - NFTs display correctly on Solana Explorer (not "Unknown Token")
- ✅ **Dynamic Metadata Endpoint** - Backend serves Solana-compatible metadata JSON
- ✅ **Phantom Wallet Integration** - Seamless wallet connection and transaction signing
- ✅ **Role-Based Access** - Farmer, Consumer, and Admin roles
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Responsive Design** - Beautiful UI with Tailwind CSS and Framer Motion
- ✅ **Production-Ready** - Vercel deployment ready

## 🛠 Tech Stack

### Frontend
- **React.js 19** - UI library
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Router v7** - Client-side routing
- **Solana Wallet Adapter** - Phantom Wallet integration
- **Metaplex JS SDK** - NFT minting
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js 5** - Web framework
- **MongoDB 8** - NoSQL database
- **Mongoose 8** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **Helmet** - Security headers
- **Morgan** - HTTP logging

### Blockchain
- **Solana Web3.js** - Blockchain interaction
- **Metaplex Foundation** - NFT minting SDK
- **Phantom Wallet** - User wallet
- **Solana Devnet** - Test network

### Deployment
- **Vercel** - Frontend & Backend deployment
- **MongoDB Atlas** - Cloud database (optional)

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Vite + React)                 │
│              https://cropchain.vercel.app                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                Backend (Express.js)                         │
│           https://api.cropchain.vercel.app                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    MongoDB       Solana Devnet   Metaplex
    (Crops)      (Blockchain)     (Metadata)
```

## 📁 Folder Structure

```
cropchain/
├── frontend/
│   ├── src/
│   │   ├── assets/              # Images, fonts, static files
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # Navbar, Footer, Layout
│   │   │   ├── dashboard/       # Dashboard specific components
│   │   │   ├── forms/           # Form components
│   │   │   ├── ui/              # Button, Card, Badge, etc
│   │   │   └── layout/          # AppShell, PageTransition
│   │   ├── pages/               # Route pages (Home, Dashboard, etc)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API service layer
│   │   ├── context/             # React Context (Auth)
│   │   ├── utils/               # Helper functions
│   │   ├── constants/           # App constants
│   │   ├── data/                # Sample/mock data
│   │   ├── lib/                 # External lib wrappers
│   │   │   ├── api.ts           # Axios instance
│   │   │   └── solana.ts        # Solana integration
│   │   ├── main.tsx             # Entry point
│   │   └── App.tsx              # Routes
│   ├── public/                  # Static assets
│   ├── .env.example             # Environment template
│   ├── vercel.json              # Vercel config
│   ├── vite.config.ts           # Vite config
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/              # Database, Solana config
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth, error handling
│   │   ├── models/              # MongoDB schemas
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Helpers & utilities
│   │   ├── validators/          # Input validation
│   │   ├── seeds/               # Seed data
│   │   ├── scripts/             # Utility scripts
│   │   ├── app.ts               # Express app
│   │   └── server.ts            # Server entry
│   ├── api/                     # Vercel serverless endpoint
│   ├── .env.example             # Environment template
│   ├── vercel.json              # Vercel config
│   └── package.json
│
├── SEED_DATA.md                 # Seed data documentation
├── QUICKSTART.md                # Quick start guide
├── README.md                    # This file
├── package.json                 # Workspace root
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB (local or Atlas)
- Phantom Wallet (browser extension)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cropchain.git
cd cropchain

# Install dependencies
npm install
npm install -w frontend
npm install -w backend

# Create environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Edit .env files with your configuration
nano frontend/.env.local
nano backend/.env
```

### Configuration

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_METADATA_BASE_URL=http://localhost:5000
VITE_SOLANA_CLUSTER=devnet
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cropchain
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
API_PUBLIC_URL=http://localhost:5000
SOLANA_CLUSTER=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Running Locally

```bash
# Terminal 1: Start backend
npm run dev -w backend

# Terminal 2: Seed database with sample data
npm run seed -w backend

# Terminal 3: Start frontend
npm run dev -w frontend

# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

### Build for Production

```bash
npm run build    # Builds both frontend and backend
npm run build -w frontend   # Frontend only
npm run build -w backend    # Backend only
```

## 🔐 Authentication

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Farmer",
  "email": "john@farm.com",
  "password": "Secure@123",
  "role": "farmer",
  "farmName": "Green Valley",
  "location": "Punjab, India"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@farm.com",
  "password": "Secure@123"
}

Response: 
{
  "token": "eyJhbGc...",
  "user": { "id", "name", "email", "role", ... }
}
```

## 🌾 NFT Minting Flow

### 1. Farmer Creates Crop
- Visit Farmer Dashboard
- Fill crop details (name, type, location, etc.)
- Upload crop image
- Click "Mint Crop NFT"

### 2. Backend Processes
- Stores crop in MongoDB
- Generates metadata URI: `/api/metadata/:cropId`
- Returns crop ID and metadata URL

### 3. Frontend Mints NFT
- Connects Phantom Wallet
- Calls Metaplex SDK to mint
- Metadata URI points to backend endpoint
- Transaction signed and sent to Solana

### 4. Blockchain Updated
- Mint address generated
- Transaction confirmed
- NFT metadata stored on-chain (via Metaplex)

### 5. Verification Available
- Consumers can verify via crop ID
- Solana Explorer shows NFT details
- Blockchain-verified badge appears

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register        # Register user
POST /api/auth/login           # Login user
```

### Crops
```
GET  /api/crops                # List all crops
POST /api/crops                # Create crop (farmer only)
GET  /api/crops/:id            # Get crop details
PATCH /api/crops/:id/timeline  # Update lifecycle
PATCH /api/crops/:id/blockchain# Update blockchain details
GET  /api/crops/:id/metadata   # Get NFT metadata
GET  /api/crops/:id/verify     # Verify crop
GET  /api/crops/search?q=      # Search crops
```

### Metadata (Public - Solana Explorer)
```
GET /api/metadata/:id          # NFT metadata JSON
```

### Dashboard
```
GET /api/dashboard/summary     # Dashboard statistics
```

## 🎨 UI Components

The frontend includes production-ready components:

- **Button** - Multiple variants (primary, secondary, ghost, success)
- **Card** - Container component
- **Badge** - Status badges (success, warning, neutral, brand)
- **Input** - Text input (supports all types)
- **Textarea** - Multi-line input
- **Select** - Dropdown selector
- **CropCard** - Crop display card with copy ID and verify link
- **NftPreviewCard** - Post-mint NFT preview
- **TimelineStepper** - Lifecycle visualization
- **StatCard** - Statistics display

## 📊 Sample Data

CropChain includes 8 realistic crop samples with complete metadata.

### Seed Database
```bash
npm run seed -w backend
```

Creates:
- ✅ 8 sample farmers with credentials
- ✅ 8 sample crops with full metadata
- ✅ Lifecycle timelines
- ✅ Mock blockchain details

**Sample Credentials:**
- Email: aarav.singh@farmmail.com
- Password: Test@123456

See [SEED_DATA.md](SEED_DATA.md) for details.

## 🔗 Phantom Wallet Setup

### Install Phantom
1. Visit https://phantom.app
2. Install browser extension
3. Create or import wallet
4. Switch to Devnet network

### Get Devnet SOL
```bash
# Using Solana CLI
solana airdrop 2 <your_address> --url https://api.devnet.solana.com

# Or use Phantom's faucet
```

### Connect in CropChain
1. Click "Connect Wallet" button
2. Approve in Phantom popup
3. Ready to mint!

## 💾 MongoDB Setup

### Local MongoDB
```bash
# Install (macOS)
brew install mongodb-community

# Start
brew services start mongodb-community

# Connection string
mongodb://localhost:27017/cropchain
```

### MongoDB Atlas (Cloud)
1. Create account at https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cropchain
```

## 🌐 Production Deployment

### Deploy to Vercel

#### Frontend
```bash
# Vercel auto-detects frontend/ folder
# Settings → Environment Variables:
VITE_API_BASE_URL=https://api.cropchain.vercel.app
VITE_METADATA_BASE_URL=https://api.cropchain.vercel.app
VITE_SOLANA_CLUSTER=devnet
```

#### Backend
```bash
# Vercel auto-detects backend/vercel.json
# Settings → Environment Variables:
NODE_ENV=production
MONGODB_URI=<mongodb_atlas_uri>
JWT_SECRET=<secure_random_key>
CLIENT_URL=https://cropchain.vercel.app
API_PUBLIC_URL=https://api.cropchain.vercel.app
SOLANA_CLUSTER=devnet
```

See detailed steps in project documentation.

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### MongoDB Connection
- Verify connection string in `.env`
- Check MongoDB is running
- For Atlas: whitelist your IP address

### Phantom Wallet
- Ensure extension is installed
- Switch to Devnet network
- Hard refresh browser (Cmd+Shift+R)
- Check browser console for errors

### NFT Not on Explorer
- Verify metadata URI is public
- Check mint address on Devnet
- Wait 10-15 seconds for Explorer to refresh
- Test metadata endpoint: `GET /api/metadata/:id`

## 📖 Documentation

- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup
- [SEED_DATA.md](SEED_DATA.md) - Sample data details
- API documentation above
- Inline code comments

## 🎓 Perfect For

- ✅ College/University projects
- ✅ Hackathons
- ✅ Portfolio showcase
- ✅ Web3 learning
- ✅ Full-stack development practice

Demonstrates:
- Full-stack architecture
- Blockchain integration
- Web3 wallet connection
- NFT minting & metadata
- REST API design
- Database design
- JWT authentication
- Responsive UI/UX
- Production deployment

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributors

- **Lingaraj Patil** - Creator
- Contributions welcome! 🙏

## 📞 Support

For issues and questions:
1. Check troubleshooting section
2. Review documentation files
3. Check code comments
4. Open GitHub issue with details

---

**Made with ❤️ for agriculture and blockchain**

⭐ If helpful, please star this repository!
