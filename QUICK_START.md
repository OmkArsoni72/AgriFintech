# Quick Start Commands

## Local Development

### Start Frontend
```powershell
npm run dev
# Opens at http://localhost:3000
```

### Start Backend
```powershell
cd backend/my-express-mongodb-app
npm start
# Runs at http://localhost:5000
```

### Start Both (Windows)
```powershell
.\start-servers.bat
```

## Deployment Commands

### Push to GitHub
```powershell
git add .
git commit -m "Your commit message"
git push
```

### Deploy to Vercel
- Automatic deployment on push to main branch
- Manual: Go to Vercel Dashboard → Redeploy

## Environment Setup

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### Backend (backend/my-express-mongodb-app/.env)
```env
MONGODB_URI=mongodb://localhost:27017/agrifin
PORT=5000
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

## Production URLs (After Deployment)

### Update these after deploying:
- Backend: https://your-backend.vercel.app
- Frontend: https://your-app.vercel.app

### Update environment variables:
1. **Frontend**: 
   - `NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api`
   - `NEXTAUTH_URL=https://your-app.vercel.app`

2. **Backend**:
   - `FRONTEND_URL=https://your-app.vercel.app`
   - `MONGODB_URI=` (Use MongoDB Atlas URI)

---

See **DEPLOYMENT_GUIDE.md** for complete deployment instructions.
