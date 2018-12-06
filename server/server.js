const express = require('express');
const userRoutes = require('./Routes/user-routes');
const authRoutes = require('./Routes/auth-routes');
// const chatRoutes = require('./Routes/chat-routes');
const playerRoutes = require('./Routes/player-routes');
const next = require('next')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb://skuzbot:clavious818@cluster0-shard-00-00-chohs.mongodb.net:27017,cluster0-shard-00-01-chohs.mongodb.net:27017,cluster0-shard-00-02-chohs.mongodb.net:27017/lyrebyrddb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })
.then(() => console.log('connection to db succesful'))
.catch((err) => console.log(err));

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));

    server.use(cookieSession({
      maxAge: 24*60*60*1000,
      keys: ['lyrebyrdie']
    }));
    server.use(passport.initialize());
    server.use(passport.session());

 
    server.use('/user', userRoutes);
    server.use('/auth', authRoutes);
    server.use('/api/player', playerRoutes);
    
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
