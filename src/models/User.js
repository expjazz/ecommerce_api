const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('User', UserSchema);
