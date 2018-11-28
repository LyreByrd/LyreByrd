var express = require('express');
var router = express.Router();

const { User } = require('../../db/db');
const { UserYS } = require('../../db/db');


const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

require("../config/passport-config");


router.get('/logout', (req, res)=> {
  req.logOut();
  res.status(200).clearCookie('connect.sid', {
    path: '/'
  });
  res.redirect('/');
})

router.post("/login",  function(req, res) {
  passport.authenticate("local", { failureFlash: true }, (err, user, username) => {
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
router.get('/youtube', (req, res, next) => {
  console.log(req.query);
  username = req.query.user;
  next();
} , passport.authenticate('youtube', {
  'scope':'https://www.googleapis.com/auth/youtube'
}));

router.get('/youtube/redirect', passport.authenticate('youtube', 
{ failureRedirect: '/login' }), 
(req, res) => {
  User.findOneAndUpdate({ username }, 
    {
      yt:{
        plataformId: req.user.plataformId,
        displayName: req.user.displayName,
        provider: req.user.provider,
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
        href: req.user.href,
        url: req.user.url
      } 
    }, 
    {upsert: true}, 
    (err, user) => {
    console.log(err, user, 'USERNAMEEE');
  });
  res.redirect('/feed');
});


var spotifyScope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming';
router.get('/spotify', (req, res, next) => {
  // console.log(req.query);
  username = req.query.user;
  next();
}, 
passport.authenticate('spotify',
  {
    scope: spotifyScope
  }
));

router.get('/spotify/redirect', passport.authenticate('spotify', 
{ successFlash:true ,failureRedirect: '/profile' }), 
(req, res) => {
  console.log(req.user);
  console.log(username, 'username passed in query>>>>>>>');
  User.findOneAndUpdate({ username }, {
    plataformId: req.user.plataformId,
    displayName: req.user.displayName,
    provider: req.user.provider,
    accessToken: req.user.accessToken,
    refreshToken: req.user.refreshToken,
    href: req.user.href,
    url: req.user.url
  })
  .then((data) => {
    console.log(data, 'some promise >>>>>>>>>>');
  })
  .catch((err) => console.log(err, 'errr in db'));
  console.log(req.user, '>>>>>> authenticated user redirect');
  res.redirect('/profile');
});


module.exports = router;


