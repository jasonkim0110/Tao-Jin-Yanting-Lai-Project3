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
  res.status(200).render('login');
});

router.post('/', async (req, res, next) => {
  var payload = req.body;

  if (req.body.logUsername && req.body.logPassword) {
    var user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ],
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

  payload.errorMessage = 'Make sure each field has a valid value.';
  res.status(200).render('login');
});

router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const createUserResponse = await UserModel.createUser({
      username: username,
      password: password,
    });

    const token = jwt.sign(username, password);

    res.cookie('username', token);

    return res.send('User created successfully');
  } catch (e) {
    res.status(401).send(null);
  }
});

router.post('/create', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const createUserResponse = await UserModel.createUser({
    username: username,
    password: password,
  });

  res.cookie('username', username);

  return res.send('User created successfully');
});

router.get('/isLoggedIn', async function (req, res) {
  const username = req.cookies.username;
  const password = req.body.password;

  if (!username) {
    return res.send({ username: null });
  }
  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, password);
  } catch (e) {
    return res.send({ username: null });
  }

  if (!decryptedUsername) {
    return res.send({ username: null });
  } else {
    return res.send({ username: decryptedUsername });
  }
});

module.exports = router;
