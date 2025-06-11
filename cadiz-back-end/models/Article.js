const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
  active: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);