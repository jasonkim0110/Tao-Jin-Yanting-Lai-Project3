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

router.get('/', (req, res) => {
  var payload = {
    pageTitle: 'Home',
  };

  if (req.session.user) {
    res.status(200).render('home', payload);
  } else {
    $.get('/api/posts', (results) => {
      const container = $('.postsContainer');
      outputPosts(results, container);
    });
    payload['posts'] = [];
    res.status(200).render('homeWithoutLogin', payload);
  }
});

module.exports = router;
