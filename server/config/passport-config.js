const passport = require('passport');
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const YouTubeV3Strategy = require('passport-youtube-v3').Strategy;
const {User} = require('../../db/db');
const {UserYS} = require('../../db/db');


require('dotenv').config();




passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        done(err);
      } else {
        console.log(user);
        //Check password match here
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            console.log(`${user.username} found`)
            delete user.password;
            return done(null, user);
          } else {
            console.log('Compare problem...')
            return done(err, null);
          }
        });
      }
      });
  })
);



// Youtube
passport.use(
  new YouTubeV3Strategy({
  // options
  clientID : process.env.clientIDYouTube,
  clientSecret: process.env.clientSecretYouTube,
  callbackURL: '/auth/youtube/redirect'
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, ' <<<<<< ATOKEN');
  console.log(refreshToken, ' <<<<<< RTOKEN');
  console.log(profile);
  // done(null, profile.id);
  let userYSEntry = new UserYS({
    _id: profile.id,
    provider: profile.provider,
    accessToken,
    refreshToken,
    username: profile.displayName,
    href: profile._json.etag,
  });
  UserYS.findOneAndUpdate({ username: profile.displayName }, userYSEntry, {upsert: true}, (err, user) => {
    // console.log(err, 'ERRROOOROROR')
    console.log(user, 'USERNAMEEE')
    return done(err, user);
  });
}
));


// Spotify
passport.use(
  new SpotifyStrategy({
  // options
  clientID : process.env.clientIDSpotify,
  clientSecret: process.env.clientSecretSpotify,
  callbackURL: '/auth/spotify/redirect'
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, ' <<<<<< ATOKEN');
  console.log(refreshToken, ' <<<<<< RTOKEN');
  console.log(profile);
  // done(null, profile.id);
  let userYSEntry = new UserYS({
    _id: profile.id,
    provider: profile.provider,
    accessToken,
    refreshToken,
    username: profile.displayName,
    href: profile._json.href,
    url: profile._json.external_urls
  });

    User.findOneAndUpdate({ _id: profile.id }, userYSEntry, {upsert: true}, (err, user) => {
      return done(err, user);
    });
  }
));