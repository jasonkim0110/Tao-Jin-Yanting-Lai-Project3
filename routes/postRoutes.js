const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

router.get('/:id', (req, res, next) => {
  var payload = {
    pageTitle: 'View post',
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    postId: req.params.id,
  };

  res.status(200).render('postPage', payload);
});

router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
