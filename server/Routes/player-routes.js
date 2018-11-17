const router = require('express').Router();
const axios = require('axios');
const mongoose = require('mongoose');


// todo move this later
const { Player } = require('../../db/db.js')

// todo need to make a route for this
router.get('/feeds', (req, res) => {
  // console.log('/playerFeeds req', req)
  Player.find({}, (err, data) => {
    if (err) {
      console.log('err finding player feed data on server.js', err)
    } else {
      console.log('data', data);
      res.json(data);
    }
  })
})

router.post('/create', (req, res) => {
  let host = req.body.host;
  let path = req.body.path;
  const playerStream = {
    host: host,
    path: path
  }
  Player.findOneAndUpdate({ host }, playerStream, {upsert:true}, (err, data) => {
    if (err) {
      console.log('error saving player stream to db in server.js', err)
    } else {
      return res.json(data);
    }
  })
})

// todo figure out client pings error
// router.use("/player/:host", (req, res) => {
//   return app.render(req, res, "/player", {
//     host: req.body.host
//   });
// });

module.exports = router;