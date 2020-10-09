const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

const ItemSchema = mongoose.Schema({
  price: String,
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
