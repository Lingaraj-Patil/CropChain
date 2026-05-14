# 🔧 CropChain Troubleshooting Guide

Comprehensive troubleshooting guide for common issues and solutions.

## 📋 Table of Contents

1. [Installation Issues](#installation-issues)
2. [Development Server Issues](#development-server-issues)
3. [Database Issues](#database-issues)
4. [Blockchain/Solana Issues](#blockchainson-issues)
5. [Authentication Issues](#authentication-issues)
6. [API Issues](#api-issues)
7. [Frontend Issues](#frontend-issues)
8. [Deployment Issues](#deployment-issues)
9. [Performance Issues](#performance-issues)

---

## Installation Issues

### Error: `npm install` fails

**Symptoms:**
```
npm ERR! code E503
npm ERR! Service Unavailable
```

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# Or use alternative registry
npm config set registry https://registry.npmjs.org/
npm install
```

### Error: Node version incompatibility

**Symptoms:**
```
The engine "node" is incompatible with this package
```

**Solution:**
Check Node version:
```bash
node --version
```

Requires Node 18+ and npm 9+. Install if needed:
```bash
# Using nvm
nvm install 20
nvm use 20

# Or download from nodejs.org
```

### Error: Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## Development Server Issues

### Frontend not loading

**Symptoms:**
- Blank white screen
- Console errors
- Page won't load

**Debugging Steps:**

1. **Check console errors:**
   - Open DevTools (F12)
   - Check Console tab
   - Look for red error messages

2. **Common console errors:**

   **"Cannot find module 'react'"**
   ```bash
   npm install
   npm run dev --prefix frontend
   ```

   **"VITE_API_BASE_URL is undefined"**
   - Create `frontend/.env.local`
   - Add required variables from `frontend/.env.example`
   - Restart dev server

   **"Uncaught TypeError: Cannot read property..."**
   - Check if backend is running
   - Verify API base URL matches backend URL
   - Check browser DevTools Network tab

3. **Clear cache and restart:**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

### Backend API not responding

**Symptoms:**
- API calls timeout
- 404 errors on valid endpoints
- Connection refused

**Debugging Steps:**

1. **Check if backend is running:**
   ```bash
   npm run dev --prefix backend
   ```

2. **Test API endpoint:**
   ```bash
   curl http://localhost:3001/api/crops
   ```

3. **Check CORS issues:**
   - Open DevTools Network tab
   - Look for CORS errors
   - Verify `CORS_ORIGIN` in backend `.env` matches frontend URL

4. **Check port conflicts:**
   ```bash
   # Check what's running on port 3001
   lsof -i :3001
   ```

5. **Verify environment variables:**
   ```bash
   # Backend .env should have
   cat backend/.env | grep -E "MONGODB_URI|JWT_SECRET|CORS_ORIGIN"
   ```

### Hot reload not working

**Symptoms:**
- Changes not reflected on save
- Have to manually restart

**Solutions:**
```bash
# Kill and restart dev server
npm run dev

# Check if files in watched directory
ls -la frontend/src

# If using WSL, check file system
# (symlinks in /mnt/ may not trigger)
```

---

## Database Issues

### MongoDB connection failed

**Symptoms:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

**Local MongoDB:**
```bash
# Start MongoDB service
# macOS with Homebrew
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongod

# Windows
net start MongoDB

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**MongoDB Atlas:**
```bash
# Check connection string
echo $MONGODB_URI

# Verify credentials
# Go to https://cloud.mongodb.com
# Check IP whitelist (add your IP)
# Check database user exists

# Test connection
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/cropchain"
```

### Seed script fails

**Symptoms:**
```
User validation failed: password: Path `password` is required
```

**Solution:**
Ensure all farmers in `backend/src/seeds/cropSeeds.ts` have password:
```typescript
const farmers = [
  {
    email: 'farmer1@example.com',
    password: 'Test@123456',  // ← Must include password
    name: 'Farmer One',
    role: 'farmer',
  },
  // ... more farmers
];
```

**Run seed script:**
```bash
npm run seed -w backend
```

### Seed script doesn't create data

**Solutions:**

1. **Check MongoDB connection:**
   ```bash
   # Verify MONGODB_URI
   cat backend/.env | grep MONGODB_URI
   
   # Test connection
   mongosh "$MONGODB_URI"
   ```

2. **Check for existing data:**
   ```bash
   npm run seed -w backend
   # Should see "✅ Clearing existing farmers and crops..."
   ```

3. **Verify collections created:**
   ```bash
   mongosh
   > use cropchain
   > show collections
   ```

4. **Manual check:**
   ```bash
   mongosh
   > use cropchain
   > db.users.find({role: 'farmer'}).count()
   > db.cropnfts.find().count()
   ```

### High memory usage

**Symptoms:**
- Application crashes after running
- 100% CPU usage
- Process killed by system

**Solutions:**
```bash
# Check memory usage
npm run dev
# Monitor in Activity Monitor (macOS) or Task Manager (Windows)

# Potential causes:
# 1. Infinite loops in code
# 2. Memory leaks in event listeners
# 3. Unbounded arrays growing
# 4. Too many database connections

# Check for connection pooling issues
# Verify MONGODB_URI includes connection pool settings
MONGODB_URI=mongodb+srv://...?maxPoolSize=10
```

---

## Blockchain/Solana Issues

### Phantom wallet not connecting

**Symptoms:**
```
Uncaught Error: Wallet not found
```

**Solutions:**

1. **Verify Phantom is installed:**
   - Visit [phantom.app](https://phantom.app)
   - Install extension for your browser

2. **Check browser compatibility:**
   - Chrome, Firefox, Brave, Edge supported
   - Private/Incognito mode may not work

3. **Verify wallet unlocked:**
   - Click Phantom extension
   - Enter password to unlock
   - Try connecting again

4. **Check Solana cluster:**
   ```javascript
   // In frontend code
   console.log('RPC URL:', process.env.VITE_SOLANA_RPC_URL);
   // Should show: https://api.devnet.solana.com
   ```

5. **Switch to Devnet:**
   - Click Phantom icon
   - Settings → Change Network
   - Select "Devnet"

### Devnet SOL not available

**Symptoms:**
```
Transaction simulation failed: Insufficient funds
```

**Solutions:**

1. **Request airdrop:**
   ```bash
   # Get wallet address from Phantom
   # Visit: https://faucet.solana.com
   # Paste address and request SOL
   
   # Or via CLI
   solana airdrop 2 <YOUR_ADDRESS> --url devnet
   ```

2. **Check balance:**
   - Open Phantom
   - Check SOL balance
   - Should show > 0.1 SOL

3. **Wait for airdrop confirmation:**
   - Can take 1-2 minutes
   - Check on Solana Explorer
   - https://explorer.solana.com/?cluster=devnet

### NFT minting fails

**Symptoms:**
```
Error: Failed to mint NFT
Transaction signature: [hash]
```

**Solutions:**

1. **Check balance:**
   - Verify you have Devnet SOL
   - Min ~0.1 SOL needed

2. **Check metadata URI:**
   ```bash
   # Verify endpoint is accessible
   curl https://api.cropchain.com/api/metadata/[CROP_ID]
   # Should return valid JSON
   ```

3. **Check RPC rate limits:**
   - Public RPC has rate limits (40 requests/second)
   - Use dedicated RPC endpoint for production
   - Get from: Alchemy, QuickNode, etc.

4. **Review transaction:**
   - Copy transaction hash from error
   - Visit: https://explorer.solana.com/?cluster=devnet
   - Search for transaction hash
   - See detailed error

### Metadata not showing on Solana Explorer

**Symptoms:**
- NFT shows "Unknown Token"
- Metadata fields blank
- Image not displayed

**Solutions:**

1. **Verify metadata endpoint:**
   ```bash
   # Get crop ID
   curl https://api.cropchain.com/api/crops | jq '.[0]._id'
   
   # Check metadata
   curl https://api.cropchain.com/api/metadata/[CROP_ID]
   ```

2. **Verify metadata format:**
   - Check returned JSON
   - Must include: name, symbol, image, attributes
   - Image URL must be publicly accessible
   - No CORS errors

3. **Check image URL:**
   ```bash
   # Image should be accessible
   curl -I https://example.com/crop-image.jpg
   # Should return 200 OK
   ```

4. **Verify NFT mint address:**
   - In Phantom, find NFT
   - Copy mint address
   - Search on Solana Explorer
   - Check metadata on-chain

5. **Wait for indexing:**
   - Explorer may take 30 seconds to 2 minutes to index
   - Refresh page
   - Try different browser

---

## Authentication Issues

### Login fails with valid credentials

**Symptoms:**
```
Invalid email or password
```

**Solutions:**

1. **Verify user exists in database:**
   ```bash
   mongosh
   > use cropchain
   > db.users.findOne({email: 'test@example.com'})
   ```

2. **Check password requirement:**
   - Password must be 8+ characters
   - Include uppercase, lowercase, number, special char
   - Example: `Test@123456`

3. **Verify backend is running:**
   ```bash
   npm run dev --prefix backend
   ```

4. **Check CORS settings:**
   - Verify `CORS_ORIGIN` in backend .env
   - Should match frontend URL

### JWT token expired

**Symptoms:**
```
401 Unauthorized
```

**Solutions:**

1. **Clear localStorage:**
   ```javascript
   // In browser console
   localStorage.removeItem('authToken');
   localStorage.removeItem('user');
   ```

2. **Logout and login again:**
   - Click logout button
   - Login with credentials
   - Get new token

3. **Check token expiration:**
   ```javascript
   // In browser console
   const token = localStorage.getItem('authToken');
   const payload = JSON.parse(atob(token.split('.')[1]));
   new Date(payload.exp * 1000); // Expiration time
   ```

### Can't register new user

**Symptoms:**
```
Email already exists
User validation failed
```

**Solutions:**

1. **Check email not used:**
   - Verify email is correct
   - No trailing spaces
   - Try unique email

2. **Check password requirements:**
   - 8+ characters
   - Uppercase, lowercase, number, special character
   - Example: `Test@123456`

3. **Check database for user:**
   ```bash
   mongosh
   > db.users.findOne({email: 'test@example.com'})
   ```

4. **Clear test data:**
   ```bash
   npm run seed -w backend
   # Clears and recreates fresh test data
   ```

---

## API Issues

### API returns 404 Not Found

**Symptoms:**
```
Cannot GET /api/crops
```

**Solutions:**

1. **Verify endpoint exists:**
   ```bash
   # Check routes file
   cat backend/src/routes/cropRoutes.ts | grep "router\."
   ```

2. **Verify route is registered:**
   ```bash
   # Check app.ts
   cat backend/src/app.ts | grep "cropRoutes"
   ```

3. **Verify base URL:**
   - Should be `/api/crops` not `/crops`
   - Backend URL: `http://localhost:3001`
   - Frontend should call: `http://localhost:3001/api/crops`

4. **Test with curl:**
   ```bash
   curl http://localhost:3001/api/crops -H "Authorization: Bearer YOUR_TOKEN"
   ```

### API returns 500 Server Error

**Symptoms:**
```
Internal Server Error
```

**Solutions:**

1. **Check backend console:**
   - Look for error messages
   - Stack trace shows file and line number

2. **Common causes:**
   - Database connection failed
   - Environment variable missing
   - TypeError in controller

3. **Enable debug logging:**
   ```bash
   # In backend .env
   LOG_LEVEL=debug
   npm run dev --prefix backend
   ```

4. **Check database connection:**
   ```bash
   # Verify MONGODB_URI is correct
   cat backend/.env | grep MONGODB_URI
   ```

### CORS error on API calls

**Symptoms:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**

1. **Verify CORS enabled in backend:**
   ```typescript
   // backend/src/app.ts
   app.use(cors({
     origin: process.env.CORS_ORIGIN,
     credentials: true,
   }));
   ```

2. **Update CORS_ORIGIN:**
   ```bash
   # backend/.env
   CORS_ORIGIN=http://localhost:5173
   # For Vercel deployment:
   CORS_ORIGIN=https://cropchain.vercel.app
   ```

3. **Restart backend:**
   ```bash
   npm run dev --prefix backend
   ```

4. **Test CORS headers:**
   ```bash
   curl -i -H "Origin: http://localhost:5173" http://localhost:3001/api/crops
   # Look for Access-Control-Allow-Origin header
   ```

### Rate limiting errors

**Symptoms:**
```
429 Too Many Requests
```

**Solutions:**

1. **Wait and retry:**
   - Rate limiting resets after configured time
   - Default: 15 requests per minute

2. **Adjust rate limit:**
   ```bash
   # backend/.env
   RATE_LIMIT_WINDOW=900000  # 15 minutes
   RATE_LIMIT_MAX=100        # 100 requests
   ```

3. **Disable for development:**
   ```bash
   # backend/.env
   RATE_LIMIT_ENABLED=false
   ```

---

## Frontend Issues

### Blank page or infinite loading

**Symptoms:**
- Page doesn't load
- Spinner keeps spinning
- Network tab shows pending requests

**Solutions:**

1. **Check network requests:**
   - Open DevTools → Network tab
   - Check for failed requests
   - Check status codes (200, 401, 404, 500)

2. **Check API base URL:**
   ```bash
   # frontend/.env.local should have
   VITE_API_BASE_URL=http://localhost:3001
   ```

3. **Verify backend is running:**
   ```bash
   npm run dev --prefix backend
   ```

4. **Clear cache:**
   ```bash
   # Hard refresh
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (macOS)
   
   # Or clear cache in DevTools
   → Application → Cache Storage → Delete all
   ```

### Styling not applied (Tailwind)

**Symptoms:**
- No colors or padding
- Styles look broken
- Only text visible

**Solutions:**

1. **Verify Tailwind config:**
   ```bash
   cat frontend/tailwind.config.js | head -20
   ```

2. **Check content paths:**
   ```javascript
   // Should include all template files
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
   ```

3. **Clear Tailwind cache:**
   ```bash
   rm -rf frontend/.next
   npm run dev --prefix frontend
   ```

4. **Verify CSS imported:**
   ```typescript
   // frontend/src/index.css should exist
   // frontend/src/main.tsx should import it
   import './index.css'
   ```

### Images not loading

**Symptoms:**
- Broken image icons
- Images 404

**Solutions:**

1. **Check image path:**
   ```javascript
   // Should be in public/ folder
   // Or imported as module
   import cropImage from './assets/crop.jpg'
   ```

2. **For external URLs:**
   ```javascript
   // Must be valid and accessible
   imageUrl="https://example.com/image.jpg"
   // Test in browser: fetch(url)
   ```

3. **Check CORS:**
   - Image server must allow CORS
   - Or use proxy service

### Component state not updating

**Symptoms:**
- Form input not working
- Button clicks don't respond
- Data not refreshing

**Solutions:**

1. **Check useState import:**
   ```typescript
   import { useState } from 'react'
   const [value, setValue] = useState('')
   ```

2. **Verify event handlers:**
   ```typescript
   <button onClick={() => setValue('new value')}>
     {value}
   </button>
   ```

3. **Check for stale closures:**
   ```typescript
   // ✅ CORRECT
   useEffect(() => {
     const handler = () => setValue(prev => prev + 1)
   }, []) // Empty deps
   
   // ❌ WRONG
   const handler = () => setValue(value + 1)
   // value changes, handler becomes stale
   ```

---

## Deployment Issues

### Vercel build fails

**Symptoms:**
```
Build error during deployment
```

**Solutions:**

1. **Check build locally:**
   ```bash
   npm run build
   npm run build --prefix frontend
   npm run build --prefix backend
   ```

2. **Check for TypeScript errors:**
   ```bash
   npm run build 2>&1 | grep error
   ```

3. **Verify environment variables in Vercel:**
   - Go to Vercel dashboard
   - Project → Settings → Environment Variables
   - Add all required variables from `.env.example`

4. **Check build logs:**
   - Click deployment
   - View build logs
   - Look for specific errors

### API not working after deployment

**Symptoms:**
```
404 on /api/crops
CORS errors
```

**Solutions:**

1. **Verify routes in vercel.json:**
   ```json
   {
     "routes": [
       { "src": "/api/(.*)", "dest": "/api/index.ts" },
       { "src": "/(.*)", "dest": "/index.html", "status": 200 }
     ]
   }
   ```

2. **Check environment variables:**
   - Verify all `.env` variables set in Vercel
   - Check CORS_ORIGIN matches deployed frontend URL
   - Check MONGODB_URI set correctly

3. **Test API endpoint:**
   ```bash
   curl https://your-api.vercel.app/api/crops
   ```

### Database connection fails on Vercel

**Symptoms:**
```
MongoNetworkError
ECONNREFUSED
```

**Solutions:**

1. **Verify MongoDB Atlas connection:**
   - Get connection string from Atlas
   - Format: `mongodb+srv://user:pass@cluster.mongodb.net/db`
   - Copy exact string

2. **Check IP whitelist:**
   - MongoDB Atlas → Network Access
   - Add Vercel IP: `0.0.0.0/0` (for all IPs)
   - Or whitelist specific IP ranges

3. **Verify connection string in Vercel:**
   - Vercel → Settings → Environment Variables
   - `MONGODB_URI` should be exact string
   - No extra spaces

4. **Test connection:**
   ```bash
   mongosh "your-connection-string"
   # Should connect
   ```

### Metadata endpoint 404 on deployed API

**Symptoms:**
```
GET /api/metadata/:id returns 404
NFT shows "Unknown Token" on Solana Explorer
```

**Solutions:**

1. **Verify endpoint in routes:**
   ```bash
   # Check backend/src/routes/metadataRoutes.ts
   grep -n "router\." backend/src/routes/metadataRoutes.ts
   ```

2. **Verify route registered:**
   ```bash
   # Check backend/src/app.ts
   grep metadata backend/src/app.ts
   ```

3. **Test locally first:**
   ```bash
   npm run dev --prefix backend
   curl http://localhost:3001/api/metadata/[CROP_ID]
   ```

4. **Check deployed logs:**
   - Vercel dashboard
   - Click deployment
   - View logs for errors

---

## Performance Issues

### Slow API responses

**Symptoms:**
- API takes > 1 second to respond
- Database queries slow

**Solutions:**

1. **Check database indexes:**
   ```bash
   mongosh
   > use cropchain
   > db.cropnfts.getIndexes()
   > db.users.getIndexes()
   ```

2. **Add missing indexes:**
   ```typescript
   // In CropNFT.ts model
   cropNFTSchema.index({ farmer: 1 }); // For lookups
   cropNFTSchema.index({ cropType: 1 }); // For filtering
   cropNFTSchema.index({ createdAt: -1 }); // For sorting
   ```

3. **Check for N+1 queries:**
   - Look for loops with database calls
   - Use `.populate()` for related data
   - Use `.select()` to limit fields

4. **Check Solana RPC:**
   - Public RPC may be slow
   - Use dedicated RPC (Alchemy, QuickNode)
   - Check rate limits

### Large bundle size

**Symptoms:**
- Frontend loads slowly
- JS files > 500KB

**Solutions:**

1. **Check bundle size:**
   ```bash
   npm run build --prefix frontend
   # Look for warnings about chunk size
   ```

2. **Lazy load routes:**
   ```typescript
   import { lazy } from 'react'
   const FarmerDashboard = lazy(() => import('./pages/FarmerDashboardPage'))
   ```

3. **Remove unused dependencies:**
   ```bash
   npm list --depth=0 --prefix frontend
   npm uninstall unused-package
   ```

4. **Use dynamic imports:**
   ```typescript
   import dynamic from 'next/dynamic'
   // or
   const Map = lazy(() => import('./Map'))
   ```

---

## Getting Help

If you encounter an issue not listed here:

1. **Check GitHub Issues:**
   - https://github.com/yourusername/cropchain/issues

2. **Search Stack Overflow:**
   - Tag: `cropchain` or specific tech (react, mongodb, solana)

3. **Ask in discussions:**
   - GitHub Discussions
   - Reddit: r/solana, r/mongodb, r/reactjs

4. **Create detailed issue:**
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version, MongoDB version)
   - Screenshots
   - Code snippets

---

**Last Updated:** 2024
**Tested On:** Node 20, MongoDB 6, Solana Devnet
