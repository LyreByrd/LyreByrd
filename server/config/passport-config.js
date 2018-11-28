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

passport.serializeUser((user, done) => {
  console.log(user, '<<<<<<<<<<<<< serialize');
  let uid = user.plataformId;
  done(null, uid);
});

passport.deserializeUser((id, done) => {
  User.findOne({plataformId:id})
  .then((user) => {
    // console.log(user, '<<<<<<<<<<<<< deeeeserialize');
    done(null, user);
  })
  .catch((err) => {
    console.log(err);
    done(err, null)
  })
});


// TODO protected routes with token in query
passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('Token'),
    secretOrKey   : 'its a chiansaw, no, its a bird'
  },
  (jwtPayload, cb) => {
    User.findUserJWT(jwtPayload.username, jwtPayload.password, function(err, user){
      if (!user || err) {
        console.log('Ran into issue: ',err, user);
        return cb(err, false, { message: "Failure" });
      }
      //Check password match here
      return cb(null, user[0], { message: "Success", username: user[0] });
    });
  })
);


passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, user);
      }
        //Check password match here
        bcrypt.compare(password, user.password)
        .then((res) => {
          return done(null, res, username);
        })
        .catch((err) => {
          return done(err, null);
        });
    })
    .catch((err) => {
      return done(err, null);
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
  // console.log(accessToken, ' <<<<<< ATOKEN');
  // console.log(refreshToken, ' <<<<<< RTOKEN');
  // console.log(profile);
  // done(null, profile.id);
  let userYSEntry = new User({
    plataformId: profile.id,
    provider: profile.provider,
    accessToken,
    refreshToken,
    displayName: profile.displayName,
    href: profile._json.etag,
  });
  
    return done(null, userYSEntry);

}
));


// Spotify
passport.use(
  new SpotifyStrategy({
  // options
    clientID : process.env.clientIDSpotify,
    clientSecret: process.env.clientSecretSpotify,
    callbackURL: '/auth/spotify/redirect'
  }, 
  (accessToken, refreshToken, profile, done) => {
  // console.log(accessToken, ' <<<<<< ATOKEN');
  // console.log(refreshToken, ' <<<<<< RTOKEN');
  // console.log(profile);

  let userYSEntry = new User({
    plataformId: profile.id,
    provider: profile.provider,
    accessToken,
    refreshToken,
    displayName: profile.displayName,
    href: profile._json.href,
    url: profile._json.external_urls
  });

    
  return done(null, userYSEntry);
   
  }
));