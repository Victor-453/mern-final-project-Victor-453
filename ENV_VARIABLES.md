# Environment Variables Quick Reference

## 🔴 Backend Environment Variables (Render)

Create these in Render Dashboard → Environment tab:

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cartify?retryWrites=true&w=majority
JWT_SECRET=<generate-secure-64-char-random-string>
CLIENT_URL=https://your-app-name.vercel.app
```

### Generate JWT Secret
Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🔵 Frontend Environment Variables (Vercel)

Create these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

---

## ⚠️ Important Notes

1. **Never commit `.env` files to Git** - They are already in `.gitignore`
2. **Update CLIENT_URL** after deploying frontend to match your Vercel URL
3. **Update VITE_API_BASE_URL** with your actual Render backend URL
4. **Use strong passwords** for MongoDB and JWT secrets
5. **MongoDB IP Whitelist**: Add `0.0.0.0/0` for production access

---

## 🔄 Deployment Order

1. ✅ Deploy Backend to Render first (get the backend URL)
2. ✅ Deploy Frontend to Vercel with backend URL in env variables
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
