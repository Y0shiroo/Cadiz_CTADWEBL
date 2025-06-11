const Article = require('../models/article');

// GET /api/articles - Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
};

// GET /api/articles/:id - Get a single article
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving article' });
  }
};

// POST /api/articles - Create an article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, author, active } = req.body;
    const newArticle = new Article({ 
      title, 
      content, 
      author,
      active: active || false // Default to false if not provided
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Failed to create article' });
  }
};

// PUT /api/articles/:id - Update an article
exports.updateArticle = async (req, res) => {
  try {
    console.log('Updating article:', req.params.id, 'with data:', req.body);
    
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Article not found' });
    }

    console.log('Article updated successfully:', updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Failed to update article', error: error.message });
  }
};

// DELETE /api/articles/:id - Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete article' });
  }
};
