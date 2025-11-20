# ⚡ Quick Start - Deployment Guide

**Get your Cartify app deployed in under 30 minutes!**

## 🎯 Overview

- **Backend**: Render (Free tier) → https://render.com
- **Frontend**: Vercel (Free tier) → https://vercel.com
- **Database**: MongoDB Atlas (Free tier) → https://mongodb.com/cloud/atlas

## 📝 Prerequisites Checklist

Before you start, make sure you have:

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account and database created
- [ ] Render account created
- [ ] Vercel account created

## 🚀 Deployment in 5 Steps

### Step 1: Setup MongoDB (5 minutes)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create database user (username + password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Copy connection string → Save it!
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cartify
   ```

### Step 2: Deploy Backend on Render (10 minutes)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Name: `cartify-backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<generate-random-string>
   CLIENT_URL=https://temporary-will-update-later.vercel.app
   ```
6. Click "Create Web Service"
7. **Wait for deployment** → Copy your backend URL
   ```
   Example: https://cartify-backend.onrender.com
   ```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Deploy Frontend on Vercel (10 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Vite (auto-detected)
   - Root Directory: `frontend`
   - Build: `npm run build`
   - Output: `dist`
5. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```
   (Use your backend URL from Step 2)
6. Click "Deploy"
7. **Wait for deployment** → Copy your frontend URL
   ```
   Example: https://your-app-name.vercel.app
   ```

### Step 4: Update Backend CLIENT_URL (2 minutes)

1. Go back to Render Dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Update `CLIENT_URL`:
   ```
   CLIENT_URL=https://your-app-name.vercel.app
   ```
   (Use your frontend URL from Step 3)
5. Save → Backend will redeploy automatically

### Step 5: Test Your App (5 minutes)

1. Visit your frontend URL
2. Test these features:
   - [ ] Home page loads
   - [ ] Products display
   - [ ] Register new user
   - [ ] Login
   - [ ] Add to cart
   - [ ] Checkout
   - [ ] View orders

## ✅ Done! Your App is Live!

Your application is now deployed:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-backend-url.onrender.com`

## 🎨 Next Steps

1. Share your live URL
2. Add it to your portfolio
3. Update README with live demo link
4. (Optional) Setup custom domain

## 📚 Detailed Guides

Need more details? Check these files:

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Comprehensive deployment guide with screenshots
- **[ENV_VARIABLES.md](ENV_VARIABLES.md)** - All environment variables explained
- **[PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification

## 🐛 Troubleshooting

### Backend not responding?
- Check Render logs: Dashboard → Service → Logs tab
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend can't reach backend?
- Verify `VITE_API_BASE_URL` includes your backend URL + `/api`
- Check browser console for CORS errors
- Ensure `CLIENT_URL` on backend matches frontend URL

### Socket.io not connecting?
- Check browser console for connection errors
- Verify backend URL is correct
- Ensure WebSocket not blocked by firewall

## 💡 Pro Tips

1. **Render Free Tier**: Backend sleeps after 15 min of inactivity. First request may be slow.
2. **Environment Variables**: Always update on platform dashboard, not in code.
3. **Logs**: Check logs first when troubleshooting issues.
4. **Auto-Deploy**: Both platforms redeploy automatically on Git push.

## 🆘 Still Need Help?

1. Review [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps
2. Check [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md) for common issues
3. Verify all prerequisites are complete
4. Check service logs for error messages

---

**Happy Deploying! 🚀**

Need the full deployment guide? → [DEPLOYMENT.md](DEPLOYMENT.md)
