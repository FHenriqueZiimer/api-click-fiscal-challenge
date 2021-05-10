const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersModel = mongoose.model('users', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phrases: [{ type: Schema.Types.ObjectId, ref: 'phrases' }]
}));

module.exports = usersModel;