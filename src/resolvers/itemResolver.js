const Item = require('../models/Item');
const User = require('../models/User');

const itemResolver = {
  Query: {
    items() {
      return Item.find();
    },
    item(_, { id }) {
      return Item.findById(id);
    },
  },
  Item: {
    owner(parent) {
      const user = User.findById(parent.owner);
      console.log(parent.owner);
      user.populate('owner').exec();
      return user;
    },
  },
  Mutation: {
    createItem(_, { item, ownerId }) {
      const newItem = new Item({ ...item, owner: ownerId });
      return newItem.save();
    },
    updateItem(_, { id, item }) {
      return Item.findByIdAndUpdate(id, item, {
        new: true,
        useFindAndModify: false,
      });
    },
    deleteItem(_, { id }) {
      return Item.findByIdAndRemove(id, {
        useFindAndModify: false,
      });
    },
  },
};

module.exports = itemResolver;
