# 🚀 CropChain Production Deployment Guide

Complete step-by-step guide for deploying CropChain to production on Vercel with MongoDB Atlas.

## Prerequisites

- ✅ Vercel account (https://vercel.com)
- ✅ MongoDB Atlas account (https://mongodb.com/cloud/atlas)
- ✅ GitHub account with repository
- ✅ Domain (optional, Vercel provides default)

## Phase 1: Prepare Code for Production

### 1.1 Environment Variables Setup

#### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://api.cropchain.vercel.app
VITE_METADATA_BASE_URL=https://api.cropchain.vercel.app
VITE_SOLANA_CLUSTER=devnet
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_APP_NAME=CropChain
VITE_ENABLE_MOCK_DATA=false
```

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cropchain
JWT_SECRET=your_super_secure_random_key_here_change_this
JWT_EXPIRES_IN=7d
CLIENT_URL=https://cropchain.vercel.app
API_PUBLIC_URL=https://api.cropchain.vercel.app
SOLANA_CLUSTER=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
CORS_ORIGIN=https://cropchain.vercel.app
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

### 1.2 Code Quality Checks

```bash
# Lint frontend
npm run lint -w frontend || true

# Type check backend
npm run build -w backend

# Build both
npm run build

# Fix lint issues (optional)
npm run lint:fix -w frontend || true
```

### 1.3 Test Locally with Production Build

```bash
# Build
npm run build

# Test frontend build
npm run preview -w frontend

# Test backend
npm run start -w backend
```

## Phase 2: MongoDB Atlas Setup

### 2.1 Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Create" cluster
3. Select Free tier (M0)
4. Choose region (same as deployment for latency)
5. Click "Create Cluster"

### 2.2 Create Database User

1. Go to Database → Users
2. Click "Add Database User"
3. Set username: `cropchain_user`
4. Set password: generate secure password
5. Grant permissions: `readWriteAnyDatabase`
6. Click "Add User"

### 2.3 Configure Network Access

1. Go to Security → Network Access
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0)
   - Or add specific IPs: `20.43.0.0/16` (Vercel IP ranges)
4. Click "Confirm"

### 2.4 Get Connection String

1. Click "Cluster" → "Connect"
2. Select "Drivers"
3. Choose "Node.js" driver
4. Copy connection string
5. Format: `mongodb+srv://username:password@cluster.mongodb.net/cropchain`

### 2.5 Create Database and Collections

```bash
# Using MongoDB CLI or Atlas UI

# Database: cropchain
# Collections:
# - users
# - cropnfts
# - croptimelines
# - transactions
```

## Phase 3: Deploy Backend to Vercel

### 3.1 Push Code to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: CropChain production ready"
git branch -M main
git remote add origin https://github.com/yourusername/cropchain.git
git push -u origin main
```

### 3.2 Deploy Backend

1. Go to https://vercel.com/new
2. Select "Import Project"
3. Paste GitHub repository URL
4. Click "Import"
5. Configure project:
   - **Framework Preset:** Node.js
   - **Root Directory:** `backend`
   - **Build Command:** `npm run build -w backend`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 3.3 Add Environment Variables

In Vercel Project Settings → Environment Variables:

```
NODE_ENV: production
PORT: 3000
HOST: 0.0.0.0
MONGODB_URI: mongodb+srv://cropchain_user:PASSWORD@cluster.mongodb.net/cropchain
JWT_SECRET: generate_secure_random_string_here
JWT_EXPIRES_IN: 7d
CLIENT_URL: https://cropchain.vercel.app
API_PUBLIC_URL: https://your-backend.vercel.app
SOLANA_CLUSTER: devnet
SOLANA_RPC_URL: https://api.devnet.solana.com
CORS_ORIGIN: https://cropchain.vercel.app
LOG_LEVEL: info
RATE_LIMIT_WINDOW: 15m
RATE_LIMIT_MAX_REQUESTS: 100
```

### 3.4 Deploy

Click "Deploy" and wait for build completion.

**Backend URL:** `https://your-backend.vercel.app`

## Phase 4: Deploy Frontend to Vercel

### 4.1 Create Frontend Project

1. Go to https://vercel.com/new
2. Select your GitHub repository
3. Select "Frontend" folder
4. Configure:
   - **Framework:** Vite
   - **Build Command:** `npm run build -w frontend`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install`

### 4.2 Add Environment Variables

In Vercel Project Settings → Environment Variables:

```
VITE_API_BASE_URL: https://your-backend.vercel.app
VITE_METADATA_BASE_URL: https://your-backend.vercel.app
VITE_SOLANA_CLUSTER: devnet
VITE_SOLANA_RPC_URL: https://api.devnet.solana.com
VITE_APP_NAME: CropChain
VITE_ENABLE_MOCK_DATA: false
```

### 4.3 Deploy

Click "Deploy" and wait for build completion.

**Frontend URL:** `https://cropchain.vercel.app` (or custom domain)

## Phase 5: Production Verification

### 5.1 Test Health Endpoints

```bash
# Backend health
curl https://your-backend.vercel.app/api/health

# Expected response:
# {"success":true,"message":"CropChain API is running"}
```

### 5.2 Test API Endpoints

```bash
# Get all crops
curl https://your-backend.vercel.app/api/crops

# Get metadata
curl https://your-backend.vercel.app/api/metadata/crop-1
```

### 5.3 Test Frontend

1. Open https://cropchain.vercel.app
2. Test navigation
3. Test login/register
4. Connect Phantom Wallet
5. Create and mint crop
6. Verify on Solana Explorer

## Phase 6: Solana Devnet Setup

### 6.1 Get Devnet SOL

```bash
# Using Solana CLI
solana config set --url https://api.devnet.solana.com
solana airdrop 2 <your_wallet_address>

# Verify balance
solana balance
```

### 6.2 Test NFT Minting

1. Open frontend
2. Navigate to Farmer Dashboard
3. Connect Phantom Wallet (set to Devnet)
4. Create a crop
5. Mint NFT
6. Check Solana Explorer: `https://explorer.solana.com/address/{mint_address}?cluster=devnet`

## Phase 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. Vercel Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain
4. Update DNS records (instructions on Vercel)
5. Wait for verification (can take 1-48 hours)

### 7.2 Update Environment Variables

Once domain is active:

```
Frontend:
VITE_API_BASE_URL: https://api.yourdomain.com

Backend:
CLIENT_URL: https://yourdomain.com
API_PUBLIC_URL: https://api.yourdomain.com
CORS_ORIGIN: https://yourdomain.com
```

## Phase 8: Monitoring & Maintenance

### 8.1 Setup Monitoring

1. Vercel Dashboard → Analytics
2. Enable "Real Experience Monitoring"
3. Monitor:
   - Response times
   - Error rates
   - Database queries

### 8.2 Logs

```bash
# View backend logs
vercel logs backend

# View frontend logs
vercel logs frontend
```

### 8.3 Database Backups

MongoDB Atlas automatically backs up your data. To download:

1. Go to Clusters → Backup
2. Download snapshot when needed

### 8.4 Security Checklist

- [ ] Change JWT_SECRET to random secure string
- [ ] Whitelist MongoDB IP addresses
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set strong database passwords
- [ ] Enable database user authentication
- [ ] Configure CORS properly
- [ ] Review environment variables (no secrets in code)
- [ ] Setup rate limiting
- [ ] Enable MongoDB encryption

## Troubleshooting

### Build Fails

```bash
# Check build logs
vercel logs

# Common issues:
# 1. Missing environment variables
# 2. TypeScript errors
# 3. Dependency issues

# Fix:
# - Verify all env vars are set
# - Run build locally: npm run build
# - Check dependencies: npm install
```

### Database Connection Error

```
MongoServerError: connect ECONNREFUSED
```

**Solutions:**
- Check MONGODB_URI is correct
- Verify IP whitelist in MongoDB Atlas (0.0.0.0/0)
- Check database user credentials
- Ensure network connectivity

### CORS Errors

```
Access to XMLHttpRequest at 'https://api...' from origin 'https://...' 
has been blocked by CORS policy
```

**Solutions:**
- Update CORS_ORIGIN in backend .env
- Verify CLIENT_URL matches frontend domain
- Check CORS middleware in Express

### Phantom Wallet Not Connecting

- Ensure frontend is on correct domain
- Check Solana cluster is set to Devnet
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors

### NFT Not Appearing on Explorer

- Verify metadata URI is publicly accessible
- Check mint address is valid on Devnet
- Give Explorer 10-15 seconds to refresh
- Ensure JSON metadata is returned from endpoint

## Post-Deployment Checklist

- [ ] Backend API responds to health check
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Phantom wallet connects
- [ ] Crop creation works
- [ ] NFT minting works
- [ ] Verification page works
- [ ] Solana Explorer shows NFT details
- [ ] Database records are saved
- [ ] Error handling works
- [ ] Rate limiting is active
- [ ] CORS is configured
- [ ] SSL/HTTPS works
- [ ] Custom domain works (if added)
- [ ] Monitoring is enabled
- [ ] Backups are enabled

## Scaling Considerations

### Database
- Use MongoDB Atlas cluster tier if load increases
- Enable auto-scaling for storage
- Monitor query performance

### Backend
- Vercel automatically scales serverless functions
- Monitor function cold starts
- Optimize API responses

### Frontend
- Vercel CDN caches static assets
- Monitor Core Web Vitals
- Optimize bundle size

### Blockchain
- Consider Solana Mainnet for production
- Monitor RPC rate limits
- Add failover RPC endpoints

## Cost Estimation (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Vercel Frontend | ✅ Free | $20/mo |
| Vercel Backend | ✅ Free | Pay-as-you-go |
| MongoDB Atlas | ✅ M0 | $57+ /mo |
| Custom Domain | - | $10-15/year |
| Solana RPC | ✅ Free | $100+/mo |

**Total:** $0 - $200+ depending on usage

## Security Best Practices

1. **Never commit secrets** - Use .env files only
2. **Rotate JWT secret** regularly
3. **Use HTTPS everywhere** (Vercel enforces this)
4. **Whitelist IPs** in MongoDB if possible
5. **Monitor database access** logs
6. **Setup alerts** for unusual activity
7. **Update dependencies** regularly
8. **Review security headers** (Helmet)
9. **Implement rate limiting** on APIs
10. **Log all transactions** for audit trail

## Rollback Procedure

If something breaks in production:

1. **Revert Code**
   ```bash
   git revert <commit_hash>
   git push origin main
   ```

2. **Vercel Auto-Deploys**
   - Checks out new commit
   - Runs build and tests
   - Deploys automatically

3. **Verify**
   - Check health endpoints
   - Test critical flows
   - Monitor logs

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Solana Docs: https://docs.solana.com
- Express.js: https://expressjs.com
- React: https://react.dev

---

**Deployment Complete! 🎉**

Your CropChain instance is now live and production-ready.

Monitor it regularly and keep dependencies updated!
