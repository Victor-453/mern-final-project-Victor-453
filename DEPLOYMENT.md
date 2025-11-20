# 🚀 Deployment Guide

This guide will walk you through deploying your Cartify MERN application:
- **Backend**: Render (Node.js/Express API)
- **Frontend**: Vercel (React/Vite)

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ A GitHub account with your code repository
2. ✅ A [Render](https://render.com) account (free tier available)
3. ✅ A [Vercel](https://vercel.com) account (free tier available)
4. ✅ A MongoDB Atlas database (or other MongoDB hosting)
5. ✅ All code committed and pushed to GitHub

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

## 🔧 Part 2: Deploy Backend to Render

### Step 1: Prepare Your Repository

Ensure your repository has:
- `render.yaml` in the root directory ✅ (already created)
- `package.json` with proper scripts ✅ (already configured)
- `.gitignore` excluding `.env` and `node_modules` ✅

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)
   - Click "New +" → "Web Service"

2. **Connect Your Repository**
   - Connect your GitHub account
   - Select your repository: `mern-final-project-Victor-453`
   - Click "Connect"

3. **Configure the Service**
   - **Name**: `cartify-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty (backend is in root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable" for each:
   
   ```
   NODE_ENV = production
   PORT = 10000
   MONGO_URI = mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/cartify?retryWrites=true&w=majority
   JWT_SECRET = [Generate a secure random string]
   CLIENT_URL = https://your-app-name.vercel.app
   ```

   **To generate a secure JWT_SECRET**, run this in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

   **Important**: You'll update `CLIENT_URL` after deploying the frontend

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Once deployed, copy your backend URL (e.g., `https://cartify-backend.onrender.com`)

### Step 3: Test Backend Deployment

Visit: `https://your-backend-url.onrender.com/api/products`

You should see a JSON response (empty array or products data).

---

## 🎨 Part 3: Deploy Frontend to Vercel

### Step 1: Prepare Your Repository

Ensure your frontend directory has:
- `vercel.json` ✅ (already created)
- `package.json` with build script ✅
- Environment variable example ✅

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

2. **Import Repository**
   - Click "Import" next to your repository
   - Select your repository: `mern-final-project-Victor-453`

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: Click "Edit" → Select `frontend` folder
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   
   In the "Environment Variables" section, add:
   
   ```
   VITE_API_BASE_URL = https://your-backend-url.onrender.com/api
   ```
   
   Replace `your-backend-url.onrender.com` with your actual Render backend URL from Part 2.

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Once deployed, copy your frontend URL (e.g., `https://your-app-name.vercel.app`)

### Step 3: Update Backend CLIENT_URL

1. Go back to Render Dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Update `CLIENT_URL` with your Vercel frontend URL:
   ```
   CLIENT_URL = https://your-app-name.vercel.app
   ```
5. Save changes (this will trigger a redeployment)

---

## ✅ Part 4: Verify Deployment

### Test Your Application

1. **Visit your frontend URL**: `https://your-app-name.vercel.app`
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

1. **Check Backend Logs** (Render Dashboard → Logs)
2. **Check Frontend Build Logs** (Vercel Dashboard → Deployments → View Details)
3. **Check Browser Console** for frontend errors
4. **Verify Environment Variables** are set correctly on both platforms

Common issues:
- **CORS errors**: Verify `CLIENT_URL` in Render matches your Vercel URL exactly
- **API not responding**: Check backend logs for errors
- **404 errors**: Ensure `vercel.json` rewrites are configured correctly
- **Socket.io not connecting**: Verify VITE_API_BASE_URL doesn't include `/api` for socket connection

---

## 🔄 Part 5: Continuous Deployment

Both Render and Vercel support automatic deployments:

### Automatic Deployments

- **Push to GitHub** → Both platforms automatically redeploy
- **Render**: Redeploys on every push to `main` branch
- **Vercel**: Redeploys on every push to `main` branch

### Manual Redeployment

- **Render**: Dashboard → Select Service → "Manual Deploy" → "Deploy latest commit"
- **Vercel**: Dashboard → Select Project → "Redeploy"

---

## 🔒 Part 6: Environment Variables Reference

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port | `10000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/cartify` |
| `JWT_SECRET` | JWT signing secret | `your-secure-random-string` |
| `CLIENT_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

---

## 📊 Part 7: Monitoring and Maintenance

### Render Free Tier Limitations

- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after inactivity may take 30-60 seconds
- 750 hours/month free (enough for one app running 24/7)

### Vercel Free Tier Limitations

- 100 GB bandwidth/month
- 6,000 build minutes/month
- Fast global CDN

### Keeping Backend Active

To prevent backend from spinning down, you can:
1. Use a uptime monitoring service (e.g., UptimeRobot)
2. Upgrade to Render's paid plan ($7/month)

---

## 🎉 Deployment Complete!

Your Cartify application is now live:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-backend-url.onrender.com`

### Share Your App

Share your deployed app URL with users, add it to your portfolio, and update your README.md with the live demo link!

### Next Steps

- Set up custom domain (optional)
- Configure SSL certificates (automatic on both platforms)
- Set up monitoring and error tracking
- Implement analytics
- Add meta tags for better SEO

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

---

## 📝 Deployment Checklist

Use this checklist to ensure everything is properly deployed:

### Backend Deployment
- [ ] MongoDB Atlas database created and accessible
- [ ] Render account created
- [ ] Repository connected to Render
- [ ] Environment variables configured on Render
- [ ] Backend deployed successfully on Render
- [ ] Backend API endpoint accessible

### Frontend Deployment
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Frontend root directory set to `frontend`
- [ ] Environment variable `VITE_API_BASE_URL` configured
- [ ] Frontend deployed successfully on Vercel
- [ ] Frontend loads correctly in browser

### Final Configuration
- [ ] Backend `CLIENT_URL` updated with Vercel frontend URL
- [ ] CORS configured properly
- [ ] Socket.io connection working
- [ ] All features tested on production
- [ ] README.md updated with live demo links

---

**Happy Deploying! 🚀**
