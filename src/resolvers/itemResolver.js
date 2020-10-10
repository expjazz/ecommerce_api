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
    async createItem(_, { item, ownerId }) {
      const newItem = new Item({ ...item, owner: ownerId });
      newItem.save();
      const owner = await User.findById(ownerId);
      owner.items.push(newItem);
      owner.save();

      return newItem;
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
