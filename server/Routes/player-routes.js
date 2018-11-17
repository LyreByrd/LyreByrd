const express = require('express');
const router = express.Router();
const axios = require('axios');

const syncServerUrl = process.env.SYNC_SERVER_URL || 'localhost';
const syncServerPort = process.env.SYNC_SERVER_PORT || 1234;

router.get('/host', (req, res) => {
  axios.get(`http://${syncServerUrl}:${syncServerPort}/api/player/host`)
    .then(response => {
      res.setStatus(200).send(response.body);
    })
    .catch(err => {
      if(err.status) {
        res.setStatus(err.status).send(err);
      } else {
        res.sendStatus(500);
      }
    });
})

router.get('/client', (req, res) => {
  axios.get(`http://${syncServerUrl}:${syncServerPort}/api/player/client`)
    .then(response => {
      res.setStatus(200).send(response.body);
    })
    .catch(err => {
      if(err.status) {
        res.setStatus(err.status).send(err);
      } else {
        res.sendStatus(500);
      }
    });
})

module.exports = router;