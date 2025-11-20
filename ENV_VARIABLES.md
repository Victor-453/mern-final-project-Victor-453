# Environment Variables Quick Reference - Render Deployment

## 🔴 Backend Environment Variables (Render Web Service)

Create these in Render Dashboard → Backend Service → Environment tab:

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cartify?retryWrites=true&w=majority
JWT_SECRET=<generate-secure-64-char-random-string>
CLIENT_URL=https://cartify-frontend.onrender.com
```

### Generate JWT Secret
Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🔵 Frontend Environment Variables (Render Static Site)

Create these in Render Dashboard → Frontend Service → Environment tab:

```env
VITE_API_BASE_URL=https://cartify-backend.onrender.com/api
```

---

## ⚠️ Important Notes

1. **Never commit `.env` files to Git** - They are already in `.gitignore`
2. **Use Blueprint Deployment** - Render will detect `render.yaml` and deploy both services
3. **Update CLIENT_URL** after deploying to match your frontend Render URL
4. **Update VITE_API_BASE_URL** with your backend Render URL
5. **Use strong passwords** for MongoDB and JWT secrets
6. **MongoDB IP Whitelist**: Add `0.0.0.0/0` for production access

---

## 🔄 Deployment Order

**Option A: Blueprint Deployment (Recommended)**
1. ✅ Deploy using Render Blueprint (deploys both services together)
2. ✅ Configure environment variables for both services
3. ✅ Ensure URLs match between services
4. ✅ Test deployment

**Option B: Manual Deployment**
1. ✅ Deploy Backend to Render first (get the backend URL)
2. ✅ Deploy Frontend to Render with backend URL in env variables
3. ✅ Update Backend's CLIENT_URL with frontend URL
4. ✅ Redeploy backend with updated CLIENT_URL

---

## 📱 Local Development

For local development, create `.env` files (not tracked in Git):

### Root `.env` (Backend)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-local-dev-secret
CLIENT_URL=http://localhost:5173
```

### `frontend/.env` (Frontend)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🌐 Production URLs on Render

After deploying both services on Render, your URLs will be:

- **Backend**: `https://cartify-backend.onrender.com`
- **Frontend**: `https://cartify-frontend.onrender.com`

Make sure to update the environment variables with these actual URLs after deployment.
