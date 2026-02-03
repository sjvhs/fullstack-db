const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const db = require('../../models'); // adjust path if needed

// POST /posts - Create a new post (database)
router.post('/posts', async (req, res) => {
  try {
    const { content } = req.body || {};

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content required' });
    }

    const post = await db.posts.create({
      id: randomUUID(),
      content: content.trim(),
      created: new Date(),
      user_id: null
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
