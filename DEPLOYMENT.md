# 🚀 Deployment Guide - Render

This guide will walk you through deploying your Cartify MERN application on **Render**:
- **Backend**: Render Web Service (Node.js/Express API)
- **Frontend**: Render Static Site (React/Vite)

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ A GitHub account with your code repository
2. ✅ A [Render](https://render.com) account (free tier available)
3. ✅ A MongoDB Atlas database (or other MongoDB hosting)
4. ✅ All code committed and pushed to GitHub

---

## 🗄️ Part 1: Prepare MongoDB Database

### MongoDB Atlas Setup (if not already done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Add `0.0.0.0/0` to the IP Whitelist (for production access)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add your database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cartify?retryWrites=true&w=majority`

---

## 🔧 Part 2: Deploy to Render (Both Backend & Frontend)

### Step 1: Prepare Your Repository

Ensure your repository has:
- `render.yaml` in the root directory ✅ (already created)
- `package.json` with proper scripts ✅ (already configured)
- `.gitignore` excluding `.env` and `node_modules` ✅

### Step 2: Deploy Using Blueprint (Recommended)

**Option A: Deploy Both Services Together (Blueprint)**

1. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)
   - Click "New +" → "Blueprint"

2. **Connect Your Repository**
   - Connect your GitHub account
   - Select your repository: `mern-final-project-Victor-453`
   - Click "Connect"

3. **Render will detect `render.yaml`**
   - Render automatically detects the blueprint configuration
   - It will create TWO services:
     - `cartify-backend` (Web Service)
     - `cartify-frontend` (Static Site)

4. **Configure Environment Variables**
   
   For **Backend Service** (`cartify-backend`):
   ```
   NODE_ENV = production
   PORT = 10000
   MONGO_URI = mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/cartify?retryWrites=true&w=majority
   JWT_SECRET = [Generate a secure random string]
   CLIENT_URL = https://cartify-frontend.onrender.com
   ```

   For **Frontend Service** (`cartify-frontend`):
   ```
   VITE_API_BASE_URL = https://cartify-backend.onrender.com/api
   ```

   **To generate a secure JWT_SECRET**, run this in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Deploy Both Services**
   - Click "Apply" to deploy both services
   - Wait for deployment (10-15 minutes total)
   - Backend URL: `https://cartify-backend.onrender.com`
   - Frontend URL: `https://cartify-frontend.onrender.com`

### Step 3: Manual Deployment (Alternative)

**Option B: Deploy Services Separately**

If you prefer to deploy manually:

**Deploy Backend First:**
1. Click "New +" → "Web Service"
2. Connect repository → Select `mern-final-project-Victor-453`
3. Configure:
   - Name: `cartify-backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add backend environment variables
4. Deploy and get backend URL

**Deploy Frontend Second:**
1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - Name: `cartify-frontend`
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/dist`
   - Add `VITE_API_BASE_URL` environment variable
4. Deploy and get frontend URL

### Step 4: Update CLIENT_URL

After both services are deployed:

1. Go to Backend service settings
2. Update `CLIENT_URL` with your frontend URL:
   ```
   CLIENT_URL = https://cartify-frontend.onrender.com
   ```
3. Save (backend will redeploy)

### Step 5: Test Deployment

Visit your frontend: `https://cartify-frontend.onrender.com`

Test backend API: `https://cartify-backend.onrender.com/api/products`

---

## 🎨 Part 3: Configure CORS and Environment Variables

### Important Configuration

After both services are deployed, ensure:

1. **Backend `CLIENT_URL` points to frontend**
   ```
   CLIENT_URL = https://cartify-frontend.onrender.com
   ```

2. **Frontend `VITE_API_BASE_URL` points to backend**
   ```
   VITE_API_BASE_URL = https://cartify-backend.onrender.com/api
   ```

3. **Both services use the same MongoDB database**

### Verify Deployment

1. **Check Backend Health**
   - Visit: `https://cartify-backend.onrender.com/api/products`
   - Should return JSON response

2. **Check Frontend**
   - Visit: `https://cartify-frontend.onrender.com`
   - Should load the application

3. **Test Full Flow**
   - Register new user
   - Login
   - Browse products
   - Add to cart
   - Checkout

---

## ✅ Part 4: Verify Deployment

### Test Your Application

1. **Visit your frontend URL**: `https://cartify-frontend.onrender.com`
2. **Test the following**:
   - ✅ Home page loads correctly
   - ✅ Products are displayed
   - ✅ User registration works
   - ✅ User login works
   - ✅ Add products to cart
   - ✅ Checkout process
   - ✅ Admin features (if applicable)
   - ✅ Real-time updates via Socket.io

### Troubleshooting

If something doesn't work:

1. **Check Backend Logs** (Render Dashboard → Backend Service → Logs)
2. **Check Frontend Build Logs** (Render Dashboard → Frontend Service → Logs)
3. **Check Browser Console** for frontend errors
4. **Verify Environment Variables** are set correctly on both services

Common issues:
- **CORS errors**: Verify `CLIENT_URL` in backend matches your frontend URL exactly
- **API not responding**: Check backend logs for errors
- **404 errors**: Ensure frontend routes are configured correctly in `render.yaml`
- **Socket.io not connecting**: Verify VITE_API_BASE_URL is correct
- **Build failures**: Check Node version compatibility and dependencies

---

## 🔄 Part 5: Continuous Deployment

Render supports automatic deployments for both services:

### Automatic Deployments

- **Push to GitHub** → Render automatically redeploys both services
- **Render**: Redeploys on every push to `main` branch
- Both backend and frontend update automatically

### Manual Redeployment

- **Backend**: Dashboard → cartify-backend → "Manual Deploy" → "Deploy latest commit"
- **Frontend**: Dashboard → cartify-frontend → "Manual Deploy" → "Deploy latest commit"
- **Both**: Can trigger from the Blueprint view

---

## 🔒 Part 6: Environment Variables Reference

### Backend Service (Render Web Service)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port | `10000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/cartify` |
| `JWT_SECRET` | JWT signing secret | `your-secure-random-string` |
| `CLIENT_URL` | Frontend URL for CORS | `https://cartify-frontend.onrender.com` |

### Frontend Service (Render Static Site)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://cartify-backend.onrender.com/api` |

---

## 📊 Part 7: Monitoring and Maintenance

### Render Free Tier Limitations

**Backend (Web Service):**
- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after inactivity may take 30-60 seconds
- 750 hours/month free (enough for one service running 24/7)

**Frontend (Static Site):**
- ✅ Always active (no spin down)
- 100 GB bandwidth/month
- Fast CDN delivery
- No cold starts

### Keeping Backend Active

To prevent backend from spinning down:
1. Use an uptime monitoring service (e.g., UptimeRobot, Cron-job.org)
2. Set up a ping service to hit your API every 14 minutes
3. Upgrade to Render's paid plan ($7/month) for always-on service

---

## 🎉 Deployment Complete!

Your Cartify application is now live on Render:

- **Frontend**: `https://cartify-frontend.onrender.com`
- **Backend**: `https://cartify-backend.onrender.com`

### Share Your App

Share your deployed app URL with users, add it to your portfolio, and update your README.md with the live demo link!

### Next Steps

- Set up custom domain (optional)
- Configure SSL certificates (automatic on Render)
- Set up monitoring and error tracking (Render provides basic monitoring)
- Implement analytics
- Add meta tags for better SEO
- Set up uptime monitoring for backend service

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

---

## 📝 Deployment Checklist

Use this checklist to ensure everything is properly deployed:

### Backend Deployment (Render Web Service)
- [ ] MongoDB Atlas database created and accessible
- [ ] Render account created
- [ ] Repository connected to Render
- [ ] Backend environment variables configured
- [ ] Backend deployed successfully on Render
- [ ] Backend API endpoint accessible

### Frontend Deployment (Render Static Site)
- [ ] Frontend service created on Render
- [ ] Environment variable `VITE_API_BASE_URL` configured
- [ ] Frontend built and deployed successfully
- [ ] Frontend loads correctly in browser
- [ ] Static assets served properly

### Final Configuration
- [ ] Backend `CLIENT_URL` updated with frontend Render URL
- [ ] CORS configured properly
- [ ] Socket.io connection working
- [ ] All features tested on production
- [ ] README.md updated with live demo links
- [ ] Both services communicating correctly

---

**Happy Deploying! 🚀**
