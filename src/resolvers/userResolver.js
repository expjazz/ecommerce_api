const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userResolver = {
  Query: {
    users() {
      return User.find();
    },

    user(_, { id }) {
      return User.findById(id);
    },

    async currentUser(_, __, context) {
      if (!context.request.userId) {
        return null;
      }
      const user = await User.findById(context.request.userId);

      return user;
    },
  },

  User: {
    async items(parent) {
      const user = await User.findById(parent._id).populate('items');
      return user.items;
    },
  },

  Mutation: {
    async signUp(_, { user }, context) {
      user.email = user.email.toLowerCase();
      const { email, password } = user;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await new User({
        ...user,
        email,
        password: hashPassword,
      });
      newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.APP_SECRET);
      context.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 100 * 60 * 60 * 24 * 365,
      });
      return newUser;
    },
    updateUser(_, { id, user }) {
      return User.findByIdAndUpdate(id, user, {
        new: true,
        useFindAndModify: false,
      });
    },
    deleteUser(_, { id }) {
      return User.findByIdAndRemove(id, {
        useFindAndModify: false,
      });
    },
  },
};

module.exports = userResolver;
