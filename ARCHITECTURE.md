# 🏗️ CropChain Architecture

Comprehensive architecture documentation for CropChain - a blockchain-based crop tracking system.

## 📊 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React + Vite)                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Pages: Home, Dashboard, Crop Details, Verification     │   │
│  │  Components: Cards, Forms, Navigation, NFT Preview      │   │
│  │  Styling: Tailwind CSS + Framer Motion                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                         (Axios + JWT)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                   Backend (Express + MongoDB)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  API Routes: Auth, Crops, Dashboard, Metadata           │   │
│  │  Controllers: Request Handlers & Business Logic         │   │
│  │  Middleware: Auth, Validation, Error Handling           │   │
│  │  Models: User, CropNFT, CropTimeline, Transaction       │   │
│  │  Validators: Zod Schemas for Input Validation           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
        ↕                                          ↕
   (Connection String)                    (Solana RPC)
        ↕                                          ↕
┌──────────────────┐              ┌─────────────────────────────┐
│  MongoDB Atlas   │              │   Solana Devnet Blockchain  │
│  ┌────────────┐  │              │  ┌───────────────────────┐  │
│  │ Farmers    │  │              │  │ NFT Mints             │  │
│  │ Crops      │  │              │  │ Token Metadata        │  │
│  │ Timelines  │  │              │  │ Phantom Wallet        │  │
│  │ Users      │  │              │  └───────────────────────┘  │
│  └────────────┘  │              │  ┌───────────────────────┐  │
│                  │              │  │ Solana Explorer       │  │
│                  │              │  │ (Public Verification) │  │
│                  │              │  └───────────────────────┘  │
└──────────────────┘              └─────────────────────────────┘
```

## 🔄 Data Flow

### 1. User Authentication Flow

```
User (Browser)
    ↓
Frontend: LoginPage (Email + Password)
    ↓
POST /api/auth/login
    ↓
Backend: authController.login()
    ├─ Validate input (Zod)
    ├─ Find user in MongoDB
    ├─ Verify password (bcryptjs)
    ├─ Generate JWT token
    └─ Return token
    ↓
Frontend: Store JWT in localStorage/memory
    ├─ Set Authorization header for future requests
    └─ Redirect to Dashboard
```

### 2. Crop Creation Flow

```
Farmer (Frontend)
    ↓
FarmerDashboardPage: Create Crop Form
    ├─ Input: cropName, cropType, location, etc.
    └─ Upload: Crop image
    ↓
POST /api/crops (with JWT)
    ↓
Backend: Middleware.auth() → Validate → cropController.createCrop()
    ├─ Validate input (Zod validator)
    ├─ Store in MongoDB
    │  ├─ CropNFT collection
    │  └─ Link to farmer via farmer_id
    ├─ Generate NFT metadata
    └─ Return crop with _id
    ↓
Frontend: Show confirmation
    ├─ Display crop card
    └─ Enable NFT minting button
```

### 3. NFT Minting Flow

```
Frontend: CropCard → "Mint NFT" Button
    ↓
Frontend: solana.ts → mintCropNft()
    ├─ Get wallet from Phantom (via WalletProvider)
    ├─ Create Metaplex instance
    ├─ Construct metadata URI
    └─ Call metaplex.nfts().create()
    ↓
Solana Devnet
    ├─ Create NFT mint account
    ├─ Create Token Metadata account
    ├─ Sign transaction (Phantom)
    └─ Broadcast to network
    ↓
Frontend: Receive response
    ├─ Mint address
    ├─ Transaction hash
    └─ Show NftPreviewCard
    ↓
Backend: PUT /api/crops/:id
    ├─ Update cropNFT with:
    │  ├─ mintAddress
    │  ├─ transactionHash
    │  └─ metadataUri
    └─ Save to MongoDB
```

### 4. Crop Verification Flow

```
Consumer (Frontend)
    ↓
VerificationPage: Enter Crop ID
    ↓
GET /api/crops/:id
    ↓
Backend: cropController.getCrop()
    ├─ Find crop in MongoDB
    ├─ Populate farmer details
    └─ Return crop data
    ↓
Frontend: Display crop details
    ├─ Farmer information
    ├─ Crop timeline (seeded→growing→harvested→packed→delivered)
    ├─ NFT details
    └─ "View on Solana Explorer" link
    ↓
Consumer: Optional - Visit Solana Explorer
    ├─ Verify NFT authenticity
    ├─ Check metadata
    └─ Confirm crop provenance
```

### 5. Metadata Serving Flow

```
Solana Explorer
    ↓
GET /api/metadata/:cropId
    ↓
Backend: metadataController.getMetadataByCropId()
    ├─ Validate cropId
    ├─ Find crop in MongoDB
    ├─ Build metadata JSON
    └─ Return Solana-standard format
    ↓
Solana Explorer
    ├─ Parse metadata JSON
    ├─ Display:
    │  ├─ NFT name
    │  ├─ Image
    │  ├─ Description
    │  └─ Attributes (crop type, location, farmer, etc.)
    └─ Cache response (60 seconds)
```

## 📁 Folder Structure

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/                 # Layout components
│   │   │   ├── Navbar.tsx         # Top navigation
│   │   │   ├── Footer.tsx         # Bottom footer
│   │   │   ├── AppShell.tsx       # Main layout wrapper
│   │   │   └── PageTransition.tsx # Page animations
│   │   │
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.tsx         # Styled button
│   │   │   ├── Card.tsx           # Card container
│   │   │   ├── CropCard.tsx       # Crop display card
│   │   │   ├── Input.tsx          # Form input
│   │   │   ├── Select.tsx         # Dropdown select
│   │   │   ├── Textarea.tsx       # Text area
│   │   │   ├── Badge.tsx          # Status badge
│   │   │   ├── StatCard.tsx       # Statistics display
│   │   │   ├── TimelineStepper.tsx # Crop timeline
│   │   │   └── NftPreviewCard.tsx # NFT display
│   │   │
│   │   ├── ProtectedRoute.tsx     # Auth guard for routes
│   │   └── RoleRoute.tsx          # Role-based route guard
│   │
│   ├── pages/                     # Page-level components
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── LoginPage.tsx          # User login
│   │   ├── RegisterPage.tsx       # User registration
│   │   ├── VerificationPage.tsx   # Crop verification
│   │   ├── FarmerDashboardPage.tsx # Farmer's dashboard
│   │   ├── ConsumerDashboardPage.tsx # Consumer's dashboard
│   │   ├── CropDetailsPage.tsx    # Crop detail view
│   │   ├── AboutPage.tsx          # About page
│   │   └── NotFoundPage.tsx       # 404 page
│   │
│   ├── context/
│   │   └── AuthContext.tsx        # Global auth state
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts             # Auth hook (future)
│   │   └── useCrops.ts            # Crops hook (future)
│   │
│   ├── lib/
│   │   ├── api.ts                 # Axios API client
│   │   └── solana.ts              # Solana blockchain integration
│   │
│   ├── data/
│   │   └── sampleData.ts          # Mock/seed data
│   │
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts              # TypeScript Vite definitions
│
├── public/                        # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── .env.example                   # Environment variables template
└── index.html                     # HTML entry point
```

### Backend

```
backend/
├── src/
│   ├── controllers/               # Request handlers
│   │   ├── authController.ts     # Auth logic
│   │   ├── cropController.ts     # Crop CRUD
│   │   ├── dashboardController.ts # Dashboard data
│   │   └── metadataController.ts # NFT metadata endpoint
│   │
│   ├── routes/                   # Route definitions
│   │   ├── authRoutes.ts         # Auth endpoints
│   │   ├── cropRoutes.ts         # Crop endpoints
│   │   ├── dashboardRoutes.ts    # Dashboard endpoints
│   │   └── metadataRoutes.ts     # Metadata endpoints
│   │
│   ├── models/                   # MongoDB schemas
│   │   ├── User.ts               # User model
│   │   ├── CropNFT.ts            # Crop model
│   │   ├── CropTimeline.ts       # Crop status timeline
│   │   └── Transaction.ts        # NFT transaction records
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.ts               # JWT authentication
│   │   ├── validate.ts           # Zod validation
│   │   └── errorHandler.ts       # Error handling
│   │
│   ├── validators/               # Input validation schemas
│   │   ├── authValidators.ts     # Auth validation
│   │   └── cropValidators.ts     # Crop validation
│   │
│   ├── utils/                    # Helper functions
│   │   ├── jwt.ts                # JWT utilities
│   │   ├── asyncHandler.ts       # Async wrapper
│   │   ├── AppError.ts           # Custom error class
│   │   └── nftMetadata.ts        # NFT metadata builder
│   │
│   ├── config/
│   │   └── db.ts                 # MongoDB connection
│   │
│   ├── seeds/
│   │   └── cropSeeds.ts          # Seed data definitions
│   │
│   ├── scripts/
│   │   └── seed.ts               # Database seeding script
│   │
│   ├── app.ts                    # Express app setup
│   ├── server.ts                 # Server startup
│   │
│   └── api/
│       └── index.ts              # Vercel serverless entry
│
├── package.json
├── tsconfig.json
├── .env.example
├── vercel.json                   # Vercel deployment config
└── README.md
```

## 🗃️ Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed with bcryptjs),
  name: string,
  role: "farmer" | "consumer" | "admin",
  farmName?: string,
  location?: string,
  bio?: string,
  walletAddress?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### CropNFT Collection

```typescript
{
  _id: ObjectId,
  farmer: ObjectId (ref: User),
  cropName: string,
  cropType: "cereal" | "vegetable" | "spice" | "fruit" | "beverage",
  location: string,
  soilType: string,
  ph_level: number,
  moisture_content: number,
  temperature: number,
  rainfall: number,
  fertilizers: string[],
  organicCertified: boolean,
  harvestDate: Date,
  quantity: number,
  unit: string,
  imageUrl: string,
  
  // NFT Fields
  nftName: string,
  nftSymbol: string,
  nftDescription: string,
  mintAddress?: string,
  transactionHash?: string,
  metadataUri?: string,
  
  createdAt: Date,
  updatedAt: Date
}
```

### CropTimeline Collection

```typescript
{
  _id: ObjectId,
  crop: ObjectId (ref: CropNFT),
  status: "seeded" | "growing" | "harvested" | "packed" | "delivered",
  timestamp: Date,
  description: string,
  location: string,
  temperature?: number,
  humidity?: number,
  notes?: string,
  createdAt: Date
}
```

### Transactions Collection

```typescript
{
  _id: ObjectId,
  crop: ObjectId (ref: CropNFT),
  transactionHash: string,
  mintAddress: string,
  status: "pending" | "confirmed" | "failed",
  amount: number,
  timestamp: Date,
  createdAt: Date
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure

```json
{
  "sub": "user_id",
  "email": "farmer@example.com",
  "role": "farmer",
  "iat": 1704067200,
  "exp": 1704153600
}
```

**Token Lifetime:** 7 days (configurable via `JWT_EXPIRES_IN`)

### Authorization Levels

```
Public Routes (No Auth Required)
├── GET /                          # Homepage
├── GET /about                     # About page
├── GET /api/crops/:id             # View crop details
└── GET /api/metadata/:id          # NFT metadata (for Solana Explorer)

User Routes (Authenticated - Any Role)
├── GET /api/user/profile          # Get user profile
├── PUT /api/user/profile          # Update profile
└── POST /api/auth/logout          # Logout

Farmer Routes (Role: farmer)
├── POST /api/crops                # Create crop
├── PUT /api/crops/:id             # Update crop
├── GET /api/dashboard/farmer      # Farmer statistics
├── GET /api/crops?farmer=:id      # My crops
└── POST /api/crops/:id/mint       # Mint NFT

Consumer Routes (Role: consumer)
├── GET /api/crops                 # List all crops
├── GET /api/dashboard/consumer    # Consumer statistics
└── POST /api/verify              # Verify crop

Admin Routes (Role: admin)
├── GET /api/admin/users           # Manage users
├── GET /api/admin/crops           # Manage all crops
└── DELETE /api/admin/users/:id    # Delete users
```

## 🔗 API Endpoints

### Authentication

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/logout            # Logout user
GET    /api/auth/verify            # Verify token
POST   /api/auth/refresh           # Refresh JWT (future)
```

### Crops

```
GET    /api/crops                  # List crops (paginated)
GET    /api/crops/:id              # Get crop details
POST   /api/crops                  # Create crop (farmer only)
PUT    /api/crops/:id              # Update crop (farmer only)
DELETE /api/crops/:id              # Delete crop (farmer only)
GET    /api/crops/:id/timeline     # Get crop status timeline
```

### Dashboard

```
GET    /api/dashboard/farmer       # Farmer dashboard stats
GET    /api/dashboard/consumer     # Consumer dashboard stats
GET    /api/dashboard/stats        # Overall statistics
```

### Metadata

```
GET    /api/metadata/:id           # Get NFT metadata (public, cacheable)
POST   /api/crops/:id/mint         # Mint NFT (farmer only)
```

### User

```
GET    /api/user/profile           # Get profile
PUT    /api/user/profile           # Update profile
POST   /api/user/avatar            # Upload avatar
```

## 🛡️ Security Architecture

### Input Validation

```
Request → Express Middleware
    ↓
Zod Schema Validation
    ├─ Check required fields
    ├─ Validate types
    ├─ Validate ranges/formats
    └─ Sanitize input
    ↓
If Valid → Continue to Controller
If Invalid → Return 400 Bad Request
```

### Password Security

```
User Password (plaintext)
    ↓
bcryptjs.hash(password, 10)
    ├─ Generate salt
    ├─ Hash password
    └─ Store in DB
    ↓
Login
    ↓
bcryptjs.compare(inputPassword, hashedPassword)
    ├─ If match → Generate JWT
    └─ If no match → Reject with 401
```

### JWT Token Flow

```
POST /api/auth/login
    ↓
Validate credentials
    ↓
Generate JWT
    ├─ Payload: user_id, email, role
    ├─ Secret: process.env.JWT_SECRET
    └─ Expires: 7 days
    ↓
Return token to frontend
    ↓
Frontend stores in localStorage/memory
    ↓
Subsequent requests
    ↓
Add to Authorization header: Bearer <token>
    ↓
Backend validates
    ├─ Check signature
    ├─ Check expiration
    ├─ Extract user info
    └─ Allow/deny request
```

### Request Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
X-CSRF-Token: (if CSRF enabled)
```

## 🚀 Deployment Architecture

### Frontend Deployment (Vercel)

```
GitHub Repository
    ↓
Push to main branch
    ↓
Vercel detects change
    ↓
Build: npm run build (Vite)
    ├─ Compile TypeScript
    ├─ Bundle React components
    ├─ Optimize assets
    └─ Generate static files
    ↓
Deploy to CDN
    ├─ Distribute globally
    ├─ Cache static assets
    └─ Enable HTTPS
    ↓
Serve to users
```

### Backend Deployment (Vercel Serverless)

```
GitHub Repository
    ↓
Push to main branch
    ↓
Vercel detects change
    ↓
Build: npm run build (TypeScript)
    ├─ Compile TS to JS
    ├─ Resolve dependencies
    └─ Package functions
    ↓
Deploy to serverless functions
    ├─ api/routes → Vercel Functions
    ├─ Auto-scale
    └─ Enable CORS
    ↓
MongoDB Atlas connection
    ├─ Connection string from .env
    ├─ Connection pooling
    └─ SSL encryption
    ↓
Serve API responses
```

### Database (MongoDB Atlas)

```
Cluster Configuration
    ├─ Production: M0 Free tier (development)
    ├─ Staging: M2 (testing)
    └─ Production: M5+ (production)
    ├─ Replication: 3-node replica set
    ├─ Backup: Daily automated backups
    └─ Encryption: TLS 1.2+
```

### Environment Variables

**Frontend (.env.local)**
```
VITE_API_BASE_URL=https://api.cropchain.com
VITE_METADATA_BASE_URL=https://api.cropchain.com
VITE_SOLANA_CLUSTER=devnet
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_APP_NAME=CropChain
```

**Backend (.env)**
```
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cropchain?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

CLIENT_URL=https://cropchain.vercel.app
API_PUBLIC_URL=https://api.cropchain.com

SOLANA_CLUSTER=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

CORS_ORIGIN=https://cropchain.vercel.app
LOG_LEVEL=info
```

## 📊 Data Flow Diagrams

### Complete User Journey

```
┌─────────────┐
│   Farmer    │
└──────┬──────┘
       │ Register/Login
       ↓
┌─────────────────────────┐
│ Frontend: Dashboard     │
└──────┬──────────────────┘
       │ Create Crop
       ↓
┌─────────────────────────┐
│ Backend: Save to DB     │
└──────┬──────────────────┘
       │ Stored
       ↓
┌─────────────────────────┐
│ Frontend: Show Crop     │
└──────┬──────────────────┘
       │ Mint NFT
       ↓
┌─────────────────────────┐
│ Solana: Create NFT      │
└──────┬──────────────────┘
       │ Confirmed
       ↓
┌─────────────────────────┐
│ Backend: Save TX Hash   │
└──────┬──────────────────┘
       │ Updated
       ↓
┌──────────────────────────┐
│ Consumer: Verify         │
│ (Solana Explorer)        │
└──────────────────────────┘
```

## 🔄 Caching Strategy

### Frontend Caching

- **Assets**: Browser cache (images, CSS, JS)
- **API Responses**: Memory cache (React Query/SWR - future)
- **User Data**: LocalStorage (JWT token)

### Backend Caching

- **Metadata**: 60 second HTTP cache (for Solana Explorer)
- **Database**: Connection pooling (MongoDB)
- **API Responses**: No caching (data freshness important)

## 📈 Scalability Considerations

### Database Scaling

```
Development: Single MongoDB Atlas cluster
    ↓
Production: Replica set with backups
    ↓
Future: Sharding by farmer_id if >1M crops
```

### Application Scaling

```
Vercel Serverless: Auto-scales per request
    ├─ No servers to manage
    ├─ Automatic load balancing
    ├─ Cold start optimization
    └─ Pay per execution
```

### Frontend Scaling

```
Vercel CDN: Globally distributed
    ├─ Auto caching
    ├─ Edge optimization
    └─ Zero-config deployment
```

---

For deployment details, see [DEPLOYMENT.md](DEPLOYMENT.md)
For API endpoint documentation, see [README.md](README.md#-api-endpoints)
For database setup, see [README.md](README.md#-database-setup)
