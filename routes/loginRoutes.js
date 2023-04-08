const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
  res.status(200).render('Login');
});

router.post('/', async (req, res, next) => {
  var payload = req.body;

  if (req.body.logUsername && req.body.logPassword) {
    var user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ], // MongoDB operator
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = 'Something went wrong.';
      res.status(200).render('login', payload);
    });
    if (user != null) {
      var result = await bcrypt.compare(req.body.logPassword, user.password);
      if (result === true) {
        req.session.user = user;
        return res.redirect('/');
      }
    }
    payload.errorMessage = 'Login credentials incorrect.';
    return res.status(200).render('login', payload);
  }
  payload.errorMessage = 'Make sure each field has a valid value';
  res.status(200).render('login');
});

module.exports = router;

// block content
//     .loginContainer
//         h1 Login
//         form(method = "post")
//             input(type="text", name="logUsername", placeholder = "Username or email", required = "")
//             input(type="password", name="logPassword", placeholder = "Password", required = "")
//             input(type="submit", value="Login")
//         a(href="/register")  Need an account ? Register Here.
