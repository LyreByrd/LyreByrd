var express = require('express');
var router = express.Router();
var axios = require('axios');
const popupTools = require('popup-tools');
const SpotifyStrategy = require('passport-spotify').Strategy;
const YouTubeV3Strategy = require("passport-youtube-v3").Strategy;

const { User } = require('../../db/db');
const { UserYS } = require('../../db/db');


const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

require("../config/passport-config");


router.get('/logout', (req, res)=> {
  // console.log(req.session, 'session from req')
  req.logout();
  res.status(200).clearCookie('connect.sid', {
    path: '/'
  });
  res.redirect('/');
})

router.post("/login",  function(req, res) {
  passport.authenticate("local", 
  { failureFlash: true, successRedirect: '/profile', session: false }, 
  (err, user, username) => {
    console.log(err, user);
    if (err) return res.status(400).json({message: JSON.stringify(err)});
    if (user) {
      const token = jwt.sign(username, "its a chiansaw, no, its a bird");
      return res.status(200).send(JSON.stringify({username:username, token}));
    }
    return res.status(401).json({message: 'invalid login'});
  })(req,res);
});

router.post('/signup', (req, res) => {
  console.log(req.body, 'routesss');
  const password = req.body.password;
  const username = req.body.username;
  bcrypt.hash(password, 10, (err, hash)=>{
    if (err) {
      console.log(err, 'errrroor');
      return;
    }
    const newUser = new User({
      username,
      password: hash
    })
    User.findOneAndUpdate({ username },
       newUser, 
       { upsert: true, returnNewDocument: true, new: true }, 
       (err, user) => {
      if (err) {
        console.log(err, ' db errroor');
        return res.status(400).json({message: 'username exists'});
      }
      console.log(user, '<<<<<');
      req.login(user, { session: false }, err => {
        console.log("logging user in...");
        if (err) {
          return res.send(err + ' error in routes');
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user.username, "its a chainsaw, no, its a bird");
        console.log(user.username, 'user login after sign up');
        return res.status(200).json({username: user.username, token});
      });
    });
  });
});

let username

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
  console.log(username);
  console.log(profile.photos, 'user profile >>>>>>>>>>>');
  let userYSEntry = {
    plataformId: profile.id,
    provider: profile.provider,
    accessToken,
    refreshToken,
    displayName: profile.displayName,
    href: profile._json.href,
    url: profile._json.external_urls.spotify,
    photo: profile.photos[0]
  }; 

  User.findOneAndUpdate({username}, userYSEntry, {returnNewDocument:true})
  .then(user => {
    console.log(user, '<<<<<<<<< found and updated')
    done(null, user);
  })
  .catch(err => {console.log(err)});
   
  }
));

var spotifyScope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming';
router.get('/spotify',(req, res, next) => {
  console.log(req.query, 'request queryyy');
  username = req.query.user;
  next();
}, 
passport.authenticate('spotify',
  {
    scope: spotifyScope,
    display: 'popup',
    showDialog: true
  }
));

router.get('/spotify/redirect', passport.authenticate('spotify', 
{ failureRedirect: '/profile' }), 
(req, res) => {
  console.log(req.user, 'req.user object');
  console.log(username, 'username passed in query>>>>>>>');
  // res.status(200)
  let userInfo = {
    displayName: req.user.displayName,
    photo: req.user.photo,
    url: req.user.url
  }
  res.end(popupTools.popupResponse(userInfo));
});





// passport.use(
//   new YouTubeV3Strategy({
//   // options
//   clientID : process.env.clientIDYouTube,
//   clientSecret: process.env.clientSecretYouTube,
//   callbackURL: '/auth/youtube/redirect'
// }, (accessToken, refreshToken, profile, done) => {
//   console.log(accessToken, ' <<<<<< ATOKEN');
//   console.log(refreshToken, ' <<<<<< RTOKEN');
//   // console.log(profile);
//   // done(null, profile.id);
//   let userYSEntry = {
//     _id: profile.id,
//     provider: profile.provider,
//     accessToken,
//     refreshToken,
//     username: profile.displayName,
//     href: profile._json.etag,
//   };
//   User.findOne({username})
//   .then(user => {
//     console.log(user, '<<<<<<<<< found')
//     return done(null, user);
//   })
//   .catch(err => {
//     console.log(err)
//     return done(err, null)
//   });
   

// }
// ));

// router.get('/youtube',
// (req, res, next) => {
//   console.log(req.query, 'request queryyy');
//   username = req.query.user;
//   next();
// },
// passport.authenticate('youtube',
//   {
//     display: 'popup',
//     showDialog: true
//   }
// ));

// router.get('/youtube/redirect', 
// passport.authenticate('youtube'),
// (req,res) => {
//   console.log(req)
//   res.end(popupTools.popupResponse(req.user))
// }
// )



module.exports = router;


