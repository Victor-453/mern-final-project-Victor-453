import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import User from './models/user.model.js';
import { connectDB } from './config/db.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description:
      'Premium wireless headphones with noise cancellation and 30-hour battery life',
    price: 149.99,
    category: 'electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracker with heart rate monitor and GPS',
    price: 299.99,
    category: 'electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    name: 'Laptop Stand Aluminum',
    description: 'Ergonomic laptop stand for better posture and cooling',
    price: 49.99,
    category: 'electronics',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches',
    price: 89.99,
    category: 'electronics',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: '100% organic cotton t-shirt, comfortable and breathable',
    price: 29.99,
    category: 'clothing',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    variants: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'Classic Denim Jeans',
    description: 'Timeless denim jeans with a perfect fit',
    price: 79.99,
    category: 'clothing',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    variants: ['28', '30', '32', '34', '36'],
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning',
    price: 119.99,
    category: 'sports',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    variants: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning',
    price: 39.99,
    category: 'sports',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
  },
  {
    name: 'JavaScript: The Definitive Guide',
    description: 'Comprehensive guide to JavaScript programming',
    price: 59.99,
    category: 'books',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
  },
  {
    name: 'Clean Code',
    description: 'A handbook of agile software craftsmanship',
    price: 49.99,
    category: 'books',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500',
  },
  {
    name: 'Indoor Plant - Monstera',
    description: 'Beautiful monstera deliciosa plant for home decor',
    price: 34.99,
    category: 'home',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=500',
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic coffee mugs',
    price: 29.99,
    category: 'home',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✓ Created ${products.length} products`);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@cartify.com',
      password: 'admin123', // Will be hashed by the model
      role: 'admin',
    });
    console.log('✓ Created admin user');
    console.log('  Email: admin@cartify.com');
    console.log('  Password: admin123');

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@cartify.com',
      password: 'user123',
      role: 'user',
    });
    console.log('✓ Created regular user');
    console.log('  Email: user@cartify.com');
    console.log('  Password: user123');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
