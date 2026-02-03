const express = require('express');
const router = express.Router();
const posts = require('./posts-memory');

// GET /posts - Return in-memory posts (newest first)
router.get('/posts', (req, res) => {
  try {
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
