const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const posts = require('./posts-memory');

// POST /posts - Create a new post (in-memory)
router.post('/posts', (req, res) => {
  try {
    const { content } = req.body || {};
    if (!content || !content.trim()) return res.status(400).json({ error: 'Content required' });
    const post = { id: randomUUID(), content: content.trim(), createdAt: new Date().toISOString() };
    // newest first
    posts.unshift(post);
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
