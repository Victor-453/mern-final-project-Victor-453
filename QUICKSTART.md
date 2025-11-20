# 🚀 Cartify - Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)
- Git (optional)

## Step-by-Step Setup

### 1. Configure Environment Variables

Create `.env` file in the root directory:
```bash
MONGO_URI=mongodb://localhost:27017/cartify
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Note:** Replace `MONGO_URI` with your MongoDB connection string.

### 2. Seed the Database

Run this command to populate your database with sample products and users:
```bash
npm run seed
```

This will create:
- **Admin Account:**
  - Email: `admin@cartify.com`
  - Password: `admin123`
  
- **User Account:**
  - Email: `user@cartify.com`
  - Password: `user123`

- **12 Sample Products** across different categories

### 3. Start the Application

Run both frontend and backend:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## 🎯 Quick Test Guide

### As a Customer:
1. Browse products on the home page
2. Use filters (category, price range, search)
3. Click on a product to view details
4. Add products to cart
5. Register a new account or login with: `user@cartify.com` / `user123`
6. Proceed to checkout
7. Place an order
8. View order history in profile

### As an Admin:
1. Login with: `admin@cartify.com` / `admin123`
2. Click your profile → "Admin Dashboard"
3. **Manage Products:**
   - Create new products
   - Edit existing products
   - Delete products
   - Update stock levels
4. **Manage Orders:**
   - View all orders
   - Update order status
   - See real-time updates

## ⚡ Features to Test

### Real-Time Updates (Socket.io)
1. Open two browser windows
2. In window 1: Login as admin and go to products
3. In window 2: Browse as customer
4. Update stock in admin panel → See instant update on customer side
5. Place order as customer → See notification in admin dashboard

### Shopping Cart
- Cart persists in localStorage
- Add/remove items
- Update quantities
- Cart badge shows item count

### Dark Mode
- Toggle theme using the moon/sun icon in navbar
- Theme preference persists

### Responsive Design
- Test on different screen sizes
- Mobile menu on smaller screens

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running or check your MONGO_URI

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in .env or kill the process using that port

### Frontend Not Loading
```
Failed to fetch
```
**Solution:** Make sure backend is running and VITE_API_BASE_URL is correct

### Tailwind CSS Not Working
```
Unknown at rule @tailwind
```
**Solution:** This is just an editor warning. The CSS will work correctly when the app runs.

## 📦 Production Build

Build for production:
```bash
npm run build
npm start
```

## 🎨 Customization

### Change Brand Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Add New Product Categories
Update category options in:
- `frontend/src/pages/HomePage.jsx`
- `frontend/src/pages/AdminProductsPage.jsx`

### Modify Order Statuses
Update in `backend/models/order.model.js`:
```javascript
status: {
  enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
}
```

## 📝 API Testing

Use Postman or curl:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cartify.com","password":"admin123"}'

# Get Products
curl http://localhost:5000/api/products

# Get Products with Filters
curl "http://localhost:5000/api/products?category=electronics&minPrice=50&maxPrice=200"
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Chakra UI](https://chakra-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io](https://socket.io)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)

## 🆘 Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Make sure all dependencies are installed
4. Check MongoDB connection
5. Review the README.md for detailed documentation

## 🎉 You're All Set!

Enjoy building with Cartify! Happy coding! 🛒
