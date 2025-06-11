// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, '../cadiz-front-end/cadiz-front-end/dist');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile(path.join(root, 'index.html'));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
