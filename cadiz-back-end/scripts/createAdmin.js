const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cadiz-db';
    console.log('Using MongoDB URI:', uri);
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');

    // Check if admin already exists
    console.log('Checking for existing admin...');
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin);
      process.exit(0);
    }

    // Create admin user
    console.log('Creating new admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      age: '25',
      gender: 'Male',
      contactNumber: '1234567890',
      email: 'admin@example.com',
      type: 'admin',
      username: 'admin',
      password: hashedPassword,
      address: 'Admin Address',
      isActive: true
    });

    const savedUser = await adminUser.save();
    console.log('Admin user created successfully:', savedUser);
    console.log('\nYou can now login with:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error details:', error);
    if (error.code === 11000) {
      console.log('Duplicate key error - user might already exist');
    }
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createAdminUser(); 