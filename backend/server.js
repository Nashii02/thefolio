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
// Setup CORS BEFORE routes - simple and reliable approach
// Accept any Vercel deployment URL + localhost for development
const corsOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001', 
  'https://thefolio-hmuqfjpul-nashii02s-projects.vercel.app',
  'https://thefolio-ilen7vcz8-nashii02s-projects.vercel.app',
  'https://thefolio-hpmku2szo-nashii02s-projects.vercel.app',
  'https://thefolio-jgfm2u07u-nashii02s-projects.vercel.app',
  'https://thefolio-p9v6b7gea-nashii02s-projects.vercel.app',
  'https://thefolio-api.onrender.com', // Temporary - old endpoint
  'https://thefolio-nu3n.onrender.com', // New correct endpoint
  /\.vercel\.app$/ // Allow all Vercel preview URLs
];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
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