var express = require('express');
var router = express.Router();

const { User } = require('../../db/db');


const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

require("../config/passport-config");
// router.post('/login', (req, res) => {
//   console.log(req.body);
//   res.end(JSON.stringify('login'));
//   // app.render(req, res, '/feed', req.query); 
// });

router.post("/login",  function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, username) => {
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
    User.findOneAndUpdate({ username }, newUser, { upsert: true, returnNewDocument: true, new: true }, (err, user) => {
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


router.get('/youtube', passport.authenticate('youtube', {
  'scope':'https://www.googleapis.com/auth/youtube'
}));

router.get('/youtube/redirect', passport.authenticate('youtube', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/feed');
});


var spotifyScope = 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state';
router.get('/spotify', passport.authenticate('spotify', {
  scope: spotifyScope
}));


router.get('/spotify/redirect', passport.authenticate('spotify', { failureRedirect: '/login' }), (req, res) => {
  
  res.redirect('/profile');
});

module.exports = router;


