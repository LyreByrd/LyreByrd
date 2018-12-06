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



router.post('/profile/avatar/upload', upload.single('avatarFile'), (req, res) => {

  const avatar = {};
  avatar.data = req.body.avatarFile;
  avatar.tinyData = req.body.avatarTinyFile;
  avatar.contentType = 'image/jpeg';
  const username = req.body.username;

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

//gets full sized avatar (400px)
router.get('/profile/avatar', (req, res) => {
  username = req.query.username;
  User.findOne({ username }, 'avatar', (err, result) => {
    if (err) console.log('err getting avatar from db :', err);
    else {
      if (result && result.avatar) {
        console.log(result.avatar);
        res.send(result.avatar.data);
      } else {
        res.status(404).send('no avatar');
      }
    }
  })
})

//gets tiny avatar (100px)
router.get('/profile/tinyAvatar', (req, res) => {
  let username = req.query.username;
  User.findOne({ username }, 'avatar', (err, result) => {
    if (err) console.log('err getting avatar from db :', err);
    else {
      if (result && result.avatar) {
        res.send(result.avatar.tinyData)
      } else {
        res.status(404).send('no avatar');
      }
    }
  })
});


router.get('/getspotify', (req,res) => {
  if (!req.user) {
    return res.status(200).send({message: 'need spotify hookup'});
  }
  axios.get('https://api.spotify.com/v1/me/playlists',
  {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.user.accessToken, 
    },
  })
  .then((data) => {
    return res.status(200).send(data.data);
  })
  .catch(err =>{
    console.log(err.message, 'err on spotify request');
    return res.status(400).send(err.message);
  });
});

router.post('/refresh', (req,res) => {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'refresh_token',
      refresh_token: req.user.refreshToken
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
  // console.log(req.user, 'sesssiioon');
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
    console.log(data.config, 'data from devices');
  })
  .catch(err => {
    return res.status(err.response.status).send(err.message);
  });
});
router.get('/getSpotInfo', (req,res) => {
  if (!req.user) {
    return res.status(200).send({err: 'hook up spotify'})
  }
  userInfo = {
    username: req.user.displayName,
    photo: req.user.photo,
    url: req.user.url
  };
  res.status(200).send(userInfo);
});

router.get('/searchProfiles', (req, res) => {
  User.findOne({username:req.query.username})
  .then(data => {
    res.status(200).send({
      user: data.username, 
      url: data.url, 
      followers: data.followers
    });
  })
  .catch(err => res.status(400).end(err));
})

router.post('/followHost', (req, res) => {
  //updates user following host
  let username = req.body.user;
  let host = req.body.host;
  User.findOneAndUpdate(
    {username}, 
    {$addToSet: {following: host}}, 
    {upsert: true},
    (err, result) => {
      if (err) {
        console.log('err pushing host to following in User :', err);
        res.status(404).end(err);
      } else {
        //updates host followers list
        User.findOneAndUpdate(
          {username: host},
          {$addToSet: {followers: username}},
          {upsert: true},
          (err, result) => {
            if (err) {
              console.log('err pushing host to following in User :', err);
              res.status(404).end(err);
            } else {
              res.end();
            }
          }
        )
      }
    }
  )
})

router.post('/unFollowHost', (req, res) => {
  //updates user unfollowing host
  let username = req.body.user;
  let host = req.body.host;
  User.updateOne(
    {username}, 
    { $pull: { following: host } },
    // { multi: true },
    (err, result) => {
      if (err) {
        console.log('err updating host to unfollowing in User :', err);
        res.status(404).end(err);
      } else {
        //updates host followers list
        User.updateOne(
          {username: host},
          { $pull: { followers: username } },
          // { multi: true },
          (err, result) => {
            if (err) {
              console.log('err updating host to unfollowing in User :', err);
              res.status(404).end(err);
            } else {
              res.end();
            }
          }
        )
      }
    }
    )
})

router.get('/following', (req, res) => {
  let username = req.query.user;
  User.findOne(
    {username},
    'following',
    (err, result) => {
      if (err) {
        console.log('err getting follows in User :', err);
        res.status(404).end(err);
      } else {
        if (result === null) {
          let result = {following: []};
        }
        res.send(result.following);
      }
    }
  )
})

router.get('/followers', (req, res) => {
  let username = req.query.user;
  User.findOne({
      username
    },
    'followers',
    (err, result) => {
      if (err) {
        console.log('err getting follows in User :', err);
        res.status(404).end(err);
      } else {
        if (result === null) {
          let result = {
            following: []
          };
        }
        res.send(result.followers);
      }
    }
  )
})


module.exports = router;