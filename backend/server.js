// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const newsRoutes = require('./routes/news');
const categoryRoutes = require('./routes/category');
const stateRoutes = require('./routes/state');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (update with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/news_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/state', stateRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// backend/models/News.js
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: '/placeholder-news.jpg'
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  state: {
    type: String,
    default: 'National',
    index: true
  },
  author: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);

// backend/routes/news.js
const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news (paginated)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const news = await News.find()
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await News.countDocuments();
    
    res.json({
      news,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured news
router.get('/featured', async (req, res) => {
  try {
    const featuredNews = await News.find({ featured: true })
      .sort({ date: -1 })
      .limit(5)
      .exec();
    
    res.json(featuredNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    // Get related news from the same category
    const relatedNews = await News.find({
      category: news.category,
      _id: { $ne: news._id }
    })
      .select('title category')
      .limit(3)
      .exec();
    
    res.json({
      ...news._doc,
      relatedNews
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new news article
router.post('/', async (req, res) => {
  const news = new News(req.body);
  
  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a news article
router.patch('/:id', async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a news article
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// backend/routes/category.js
const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news by category
router.get('/:category', async (req, res) => {
  try {
    const { page = 1, limit = 10, state = 'National' } = req.query;
    const category = req.params.category;
    
    // Filter by both category and state if provided
    const query = { 
      category: { $regex: new RegExp(category, 'i') }
    };
    
    if (state !== 'National') {
      query.state = state;
    }
    
    const news = await News.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await News.countDocuments(query);
    
    res.json({
      news,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get list of all categories
router.get('/', async (req, res) => {
  try {
    const categories = await News.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// backend/routes/state.js
const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get news by state
router.get('/:state', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const state = req.params.state;
    
    const news = await News.find({ state })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await News.countDocuments({ state });
    
    res.json({
      news,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get list of all states
router.get('/', async (req, res) => {
  try {
    const states = await News.distinct('state');
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
