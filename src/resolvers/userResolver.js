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
    async items(parent) {
      console.log('object');
      const user = await User.findById(parent._id).populate('items');
      return user.items;
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
