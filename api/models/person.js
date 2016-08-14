const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const PersonSchema   = new Schema({
    id: String,
    name: String,
    phone: String,
    avatar_image: String,
    avatar_origin: String,
    email: String,
    quote: String,
    chuck: String,
    birthday: Number,
    address: {
      city : String,
      street : String,
      country : String
    }
});

module.exports = mongoose.model('Person', PersonSchema);
