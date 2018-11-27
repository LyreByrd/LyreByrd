const express = require('express');
const router = express.Router();
const axios = require('axios');

const syncServerUrl = process.env.SYNC_SERVER_URL || 'localhost';
const syncServerPort = process.env.SYNC_SERVER_PORT || 1234;

router.get('/host', (req, res) => {
  axios.get(`http://${syncServerUrl}:${syncServerPort}/api/player/host`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      if(err.status) {
        res.status(err.status).send(err);
      } else {
        res.sendStatus(500);
      }
    });
})

router.get('/client', (req, res) => {
  axios.get(`http://${syncServerUrl}:${syncServerPort}/api/player/client`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      if(err.status) {
        res.status(err.status).send(err);
      } else {
        res.sendStatus(500);
      }
    });
})

const { Player } = require('../../db/db.js')

router.get('/feeds', (req, res) => {
  // console.log('/playerFeeds req', req)
  Player.find({}, (err, data) => {
    if (err) {
      console.log('err finding player feed data on server.js', err)
    } else {
      // console.log('data', data);
      res.json(data);
    }
  })
})

router.post('/create', (req, res) => {
  let host = req.body.host;
  let path = req.body.path;
  console.log('host :', host);
  console.log('path :', path);
  const playerStream = {
    host: host,
    path: path
  }
  console.log('message res at /api/create', res);
  Player.findOneAndUpdate({ host }, playerStream, {upsert:true}, (err, data) => {
    if (err) {
      console.log('error saving player stream to db in server.js', err)
      res.sendStatus(500)
    } else {
      console.log('attempting to create sync session')
      axios.post(`http://${syncServerUrl}:${syncServerPort}/host`, {hostingName: req.body.host})
        .then(response => {
          if (response.status === 403) {
            res.sendStatus(403);
          } else {
            res.status(201).send({sync: response.data, db: JSON.stringify(data)});
          }
        })
        .catch(err => {
          console.log('error (timeout?)')
          res.sendStatus(500);
        });
    }
  })
})

module.exports = router;