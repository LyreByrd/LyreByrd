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

module.exports = router;