const express = require('express');
const userRoutes = require('./Routes/user-routes');
const authRoutes = require('./Routes/auth-routes');
const playerRoutes = require('./Routes/player-routes');
const next = require('next')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');

// todo move this later
const { Player } = require('../db/db.js')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb://lyrebyrd:chainsaw@cluster0-shard-00-00-f5q3h.mongodb.net:27017,cluster0-shard-00-01-f5q3h.mongodb.net:27017,cluster0-shard-00-02-f5q3h.mongodb.net:27017/lyrebyrd?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })
.then(() => console.log('connection to db succesful'))
.catch((err) => console.log(err));

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use('/user', userRoutes);
    server.use('/auth', authRoutes);
    server.use('/api/player', playerRoutes);
    
    server.get('/playerFeeds', (req, res) => {
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

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    // todo figure out client pings error
    // server.use("/player/:host", (req, res) => {
    //   return app.render(req, res, "/player", {
    //     host: req.body.host
    //   });
    // });


    server.post('/player/create', (req, res) => {
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

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
