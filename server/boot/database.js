
const { MONGO_URI } = require('../../config');
const mongoose = require('mongoose');
const User = require('../models/user');

const options = {  }

module.exports = {

  /**
   * Establishes a connection to the MongoDB database.
   * 
   * @returns {Promise} - when the connection is successfully established.
   */
  connectDatabase: () => {
    return mongoose.connect(MONGO_URI, options)
      .then(() => console.log('Database connection established'))
      .catch(err => console.error('Error connecting to database:', err))
  },

  setupSuperadmin: async () => {
    // check if superadmin exists
    if (await User.findOne({ accLevel: 3 })) return;

    const superadmin = new User({
      username: 'superadmin',
      password: 'superadmin',
      accLevel: 3,
    })
  }


}