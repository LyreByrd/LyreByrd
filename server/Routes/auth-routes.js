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
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      console.log("logging user in...");
      if (err) {
        return res.send(err + ' error in routes');
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user.username, "its a chiansaw, no, its a bird");
      console.log(user, ' user from routes');
      return res.send(JSON.stringify({username:user.username, token}));
    });
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
    User.findOneAndUpdate({username}, newUser, {upsert:true}, (err, data) => {
      if (err) {
        console.log(err, ' db errroor');
        return;
      }
      return res.json(data)
    });
  });
});


router.get('/youtube', passport.authenticate('youtube', {
  'scope':'https://www.googleapis.com/auth/youtube'
}));

router.get('/youtube/redirect', passport.authenticate('youtube', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/feed');
});


router.get('/spotify', passport.authenticate('spotify', {

}));


router.get('/spotify/redirect', passport.authenticate('spotify'), (req, res) => {
  res.redirect('/feed');
});

module.exports = router;

