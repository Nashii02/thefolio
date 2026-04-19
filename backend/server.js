// backend/server.js
require('dotenv').config(); // Load .env variables FIRST
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
// Import routes (you will create these files in the next steps)
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comments.routes');
const adminRoutes = require('./routes/admin.routes');
const contactRoutes = require('./routes/contact.routes');
const app = express();
connectDB(); // Connect to MongoDB
// ── Middleware ─────────────────────────────────────────────────
// Setup CORS BEFORE routes with explicit configuration
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001,https://thefolio-hmuqfjpul-nashii02s-projects.vercel.app').split(',').map(url => url.trim());

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (corsOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Handle preflight requests explicitly
app.options('*', cors(corsOptions));
// Parse incoming JSON request bodies
app.use(express.json());
// Parse form-encoded request bodies (needed for FormData with text fields)
app.use(express.urlencoded({ extended: true }));
// Serve uploaded image files as public URLs
// e.g. http://localhost:5000/uploads/my-image.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);app.use('/api/contact', contactRoutes);// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});