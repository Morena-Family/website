const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', async (req, res) => {
  const { superliveId, password } = req.body;

  const user = await User.findOne({ superliveId });

  if (!user) return res.json({
    status: false,
    message: 'User does not exist.'
  });

  if (password !== user.password) res.json({
    status: false,
    message: 'Incorrect password'
  });

  res.json({
    status: true,
    message: 'Login successful',
    user: {
      superliveId: user.superliveId,
      name: user.name
    }
  });
});

module.exports = router;