// This is here just to make removing users and blogs easier

const mongoose = require('mongoose');
const app = require('./app');
const Blog = require('./models/blog');
const logger = require('./utils/logger');
const User = require('./models/user')

const removeUsersFromDb = async () => {
  try {
    await User.deleteMany({ _id: { $ne: '647386ec0d35be92ea9826d5' } })


    logger.info('Users removed.');

    await mongoose.connection.close();
  } catch (error) {
    logger.error('Error:', error);
  }
};

removeUsersFromDb();