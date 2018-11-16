const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const userYSSchema = mongoose.Schema({
  _id: String,
  plataformId: String,
  username: String,
  provider: String,
  accessToken: String,
  refreshToken: String,
  href: String,
  url: String
});

const userSchema = mongoose.Schema({
  username: String,
  password: String
});

const UserYS = mongoose.model('UsersYS', userYSSchema);
const User = mongoose.model('Users', userSchema);




module.exports.UserYS = UserYS;
module.exports.User = User;