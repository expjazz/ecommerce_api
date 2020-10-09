const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  price: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports('Item', ItemSchema);
