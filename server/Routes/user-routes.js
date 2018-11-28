const router = require('express').Router();
const passport = require('passport');
const multer = require('multer');
const axios = require('axios');
var fs = require('fs');
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

const { User } = require('../../db/db');
const {UserYS} = require('../../db/db');


let username = null

// router.get('/youtube', passport.authenticate('youtube', {
//   'scope':'https://www.googleapis.com/auth/youtube'
// }));

// router.get('/youtube/redirect', passport.authenticate('youtube', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/feed');
// });


// router.get('/spotify', passport.authenticate('spotify', {

// }));


// router.get('/spotify/redirect', passport.authenticate('spotify'), (req, res) => {

//   res.redirect('/feed');
// });

router.post('/profile/avatar/upload', upload.single('avatarFile'), (req, res) => {

  // console.log('req.file.path :', req.file.path);
  // console.log('req.body :', req.body);

  const avatar = {};
  avatar.data = fs.readFileSync(req.file.path);
  avatar.contentType = req.file.mimetype;
  const username = req.body.username;

  // console.log('avatarObject :', avatar);
  // console.log('username :', username);

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

router.get('/profile/avatar', (req, res) => {
  username = req.query.username;
  User.findOne({ username }, 'avatar', (err, result) => {
    if (err) console.log('err getting avatar from db :', err);
    else {
      if (result && result.avatar) {
        res.send(result.avatar.data);
      } else {
        res.status(404).send('no avatar');
      }
    }
  })
})


router.get('/getspotify', (req,res) => {
  if (!req.user) {
    return res.status(200).send({message: 'need spotify hookup'});
  }
  console.log(req.user, 'sesssiioon');
  axios.get('https://api.spotify.com/v1/me/playlists',
  {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.user.accessToken, 
    },
  })
  .then((data) => {
    console.log(data.data, 'data from spotify');
    return res.status(200).send(data.data);
  })
  .catch(err =>{
    console.log(err.message, 'err on spotify request');
    return res.status(400).send(err.message);
  });
});

router.post('/refresh', (req,res) => {
  console.log(req.user, 'sesssiioon');
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'refresh_token',
      refresh_token: req.user.spotify.refreshToken
    },
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.clientIDSpotify,
      password: process.env.clientSecretSpotify
    }
  })
  .then((data) => {
    console.log(data.data, 'data from refresh');
    User.findByIdAndUpdate(req.user._id, {spotify:{accessToken:data.data.access_token}}, {new:true})
    .then(data => {
      console.log(data)
      return res.status(200).send(data);

    })
    .catch(err => {
      console.log(err)
      return res.status(400).send(err);
    });
  })
  .catch(err =>{
    console.log(err, 'err on refresh');
    return res.status(400).send(err.message);
  });
});

router.post('/player', (req,res) => {
  console.log(req.user, 'sesssiioon');
  axios({
    url: 'https://api.spotify.com/v1/me/player',
    method: 'put',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.user.accessToken, 
    },
    data: {
      device_ids: ['66fa3b35ba66385e2103ea2272c36b2345861712']
    }
  })
  .then((data) => {
    console.log(data, 'data from devices');
  })
  .catch(err => {
    console.log(err, 'err on devices');
    return res.status(err.response.status).send(err.message);
  });
});


module.exports = router;