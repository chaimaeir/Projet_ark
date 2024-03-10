const express = require('express');
const router = express.Router();

const authcontroller = require('../controllers/authController');

router.get('/auth/login', authcontroller.login);

router.get('/auth/callback', authcontroller.callback);

router.get('/auth/logout', authcontroller.logout);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

module.exports = router;