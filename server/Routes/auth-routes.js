const router = require('express').Router();

router.post('/login', (req, res) => {
      console.log(req.body);
      res.end(JSON.stringify('login'));
      // app.render(req, res, '/feed', req.query);
    });

router.post('/signup', (req, res) => {
      console.log(req.body);
      res.end(JSON.stringify('signup'));
      // app.render(req, res, '/feed', req.query);
    });

module.exports = router;

