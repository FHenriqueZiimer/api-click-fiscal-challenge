const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phraseModel = mongoose.model('phrases', new Schema({
  phrase: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
 },
}));

module.exports = phraseModel;