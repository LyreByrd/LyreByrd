const router = require('express').Router();
const passport = require('passport');
const multer = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

const { User } = require('../../db/db');

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

router.post('/profile/avatar/upload', upload.single('avatarFile'), (req, res) => {
  console.log('req :', req.file);
  console.log('req.body :', req.body);
  // const avatarBuffer = new Buffer.from();
  const avatar = {};
  avatar.data = fs.readFileSync(req.file.path);
  avatar.contentType = req.file.mimetype;
  const username = req.body.username;
  console.log('avatarObject :', avatar);
  console.log('username :', username);
  User.findOneAndUpdate({ username }, { avatar }, { upsert: true }, (err, result) => {
    if (err) {
      console.log('error saving avatar :', err);
      res.statusCode(500).end();
    }
    else {
      res.end();
    }
  } )
});


module.exports = router;