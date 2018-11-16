const express = require('express');
const userRoutes = require('./Routes/user-routes');
const authRoutes = require('./Routes/auth-routes');
const next = require('next')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');

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

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
