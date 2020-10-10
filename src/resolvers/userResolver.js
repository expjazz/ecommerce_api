const User = require('../models/User');

const userResolver = {
  Query: {
    users() {
      return User.find();
    },

    user(_, { id }) {
      return User.findById(id);
    },
  },

  User: {
    items(parent) {
      console.log('here');
      const user = User.findById(parent._id);
      return user.populate('items');
    },
  },

  Mutation: {
    createUser(_, { user }) {
      const newUser = new User(user);
      return newUser.save();
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
