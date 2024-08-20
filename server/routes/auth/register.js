const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', async (req, res) => {
  const { superliveId, name, password } = req.body;

  // Check if name has more than 2 characters
  if (name.length <= 2) {
    return res.json({
      status: false,
      message: 'Name must be at least 3 characters long'
    });
  }

  // Check if password has more than 8 characters
  if (password.length < 8) {
    return res.json({
      status: false,
      message: 'Password must be at least 8 characters long'
    });
  }

  const existingUser = await User.findOne({ superliveId });
  if (existingUser) return res.json({
    status: false,
    message: 'Superlive ID is already registered'
  });

  const user = new User({ superliveId, name, password });

  try {
    await user.save();
    res.json({
      status: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: false,
      message: 'Error registering user'
    });
  }
});

module.exports = router;