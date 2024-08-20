
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user');

router.post('/', passport.authenticate('local', { session: false }), (req, res) => {
  
  console.log(req);
  
  res.json({
    status: true,
    message: 'Login successful',
    user: {
      superliveId: req.user.superliveId,
      name: req.user.name
    }
  });
});

module.exports = router;