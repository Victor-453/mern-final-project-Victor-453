# 📋 Pre-Deployment Checklist

Use this checklist before deploying your application to ensure everything is ready.

## ✅ Code Quality & Testing

- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] All API endpoints working correctly
- [ ] Authentication flow working (register, login, logout)
- [ ] Cart functionality working
- [ ] Checkout process working
- [ ] Admin features working (if applicable)
- [ ] Socket.io real-time updates working
- [ ] Mobile responsive design tested

## ✅ Environment Setup

- [ ] `.env` files created locally (not committed to Git)
- [ ] `.env.example` files updated with latest variables
- [ ] All required environment variables documented
- [ ] MongoDB Atlas database created and accessible
- [ ] Database connection string tested
- [ ] JWT secret generated (secure random string)

## ✅ Git Repository

- [ ] All code committed to Git
- [ ] `.gitignore` properly configured
- [ ] No `.env` files in repository
- [ ] No sensitive data in code
- [ ] Repository pushed to GitHub
- [ ] README.md updated with project info

## ✅ Backend Configuration

- [ ] `package.json` has correct scripts:
  - `"start": "cross-env NODE_ENV=production node backend/server.js"`
  - `"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"`
- [ ] `render.yaml` file present in root directory
- [ ] CORS configured to accept frontend URL
- [ ] PORT environment variable used: `process.env.PORT || 5000`
- [ ] MongoDB connection properly configured
- [ ] Error handling implemented
- [ ] Socket.io CORS configured

## ✅ Frontend Configuration

- [ ] `vercel.json` file present in frontend directory
- [ ] API base URL uses environment variable: `import.meta.env.VITE_API_BASE_URL`
- [ ] Socket.io connection uses environment variable
- [ ] Build script works: `npm run build` in frontend directory
- [ ] Production build tested locally
- [ ] No hardcoded localhost URLs in code

## ✅ Security

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens properly validated
- [ ] Protected routes implement authentication
- [ ] Admin routes check for admin role
- [ ] Input validation implemented
- [ ] SQL/NoSQL injection prevention
- [ ] CORS properly configured
- [ ] No sensitive data exposed in API responses

## ✅ Database

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] IP whitelist configured (0.0.0.0/0 for production)
- [ ] Connection string tested
- [ ] Database indexes created (if applicable)
- [ ] Sample data seeded (optional)

## ✅ Performance

- [ ] Images optimized
- [ ] Build size reasonable
- [ ] No memory leaks
- [ ] Database queries optimized
- [ ] Lazy loading implemented where appropriate

## ✅ Documentation

- [ ] README.md complete with:
  - Project description
  - Features list
  - Tech stack
  - Installation instructions
  - API endpoints
  - Screenshots
- [ ] DEPLOYMENT.md created with deployment steps
- [ ] ENV_VARIABLES.md created with environment variables
- [ ] Comments in complex code sections

## ✅ Deployment Accounts

- [ ] GitHub account ready
- [ ] Render account created (https://render.com)
- [ ] Vercel account created (https://vercel.com)
- [ ] MongoDB Atlas account created (https://www.mongodb.com/cloud/atlas)

## ✅ Ready for Deployment

Once all items are checked, you're ready to deploy!

1. Follow **DEPLOYMENT.md** for step-by-step instructions
2. Deploy backend to Render first
3. Deploy frontend to Vercel second
4. Update CLIENT_URL on Render
5. Test production deployment

---

## 🔍 Post-Deployment Checklist

After deployment, verify:

- [ ] Backend API responds at: `https://your-backend.onrender.com/api/products`
- [ ] Frontend loads at: `https://your-app.vercel.app`
- [ ] User registration works
- [ ] User login works
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Order history displays
- [ ] Admin features work (if applicable)
- [ ] Socket.io connects (check browser console)
- [ ] Real-time updates work
- [ ] No CORS errors in console
- [ ] All images load correctly
- [ ] Mobile responsive
- [ ] Performance acceptable

---

## ⚠️ Common Issues & Solutions

### CORS Errors
- Verify CLIENT_URL in Render matches Vercel URL exactly
- Check if both http/https protocols match
- Ensure no trailing slashes

### API Not Responding
- Check Render logs for errors
- Verify environment variables set correctly
- Confirm MongoDB connection string is correct

### Frontend Can't Connect to Backend
- Verify VITE_API_BASE_URL is correct
- Check if backend URL includes `/api` at the end
- Confirm backend is deployed and running

### Socket.io Not Connecting
- Verify socket URL configuration
- Check CORS settings on backend
- Ensure WebSocket support not blocked

### Build Failures
- Check all dependencies are in package.json
- Verify Node version compatibility
- Review build logs for specific errors

---

**Good luck with your deployment! 🚀**
