const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


const userSchema = mongoose.Schema({
  username: {
    type:String,
    required: true
  },
  password: String,
  avatar: {
    data: Buffer, 
    tinyData: Buffer,
    contentType: String
  },
  plataformId: String,
  displayName: String,
  provider: String,
  accessToken: String,
  refreshToken: String,
  href: String,
  url: String,
  photo: String
});

const playerSchema = mongoose.Schema({
  host: String,
  path: String
});


const User = mongoose.model('Users', userSchema);

const Player = mongoose.model('Players', playerSchema);




module.exports.User = User;
module.exports.Player = Player;