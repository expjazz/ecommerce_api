const Item = require('../models/Item');

const itemResolver = {
  Query: {
    items() {
      return Item.find();
    },
    item(_, { id }) {
      return Item.findById(id);
    },
  },
  Mutation: {
    createItem(_, { item }) {
      const newItem = new Item(item);
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
