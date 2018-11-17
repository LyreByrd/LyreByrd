const router = require('express').Router();
const passport = require('passport');



router.get('/youtube', passport.authenticate('youtube', {
  'scope':'https://www.googleapis.com/auth/youtube'
}));

router.get('/youtube/redirect', passport.authenticate('youtube', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/feed');
});


router.get('/spotify', passport.authenticate('spotify', {

}));


router.get('/spotify/redirect', passport.authenticate('spotify'), (req, res) => {

  res.redirect('/feed');
});


module.exports = router;