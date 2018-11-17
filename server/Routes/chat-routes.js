const router = require('express').Router();
const axios = require('axios');

router.get('/chat', (req, res) => {
  Promise.all([
    getContents('http://localhost:3000/')
  ])
  .then(responses => 
    res.render('chat', {chat: responses[0]})
  )
  .catch(err => 
    res.send(err.message)  
  )
})

const getContents = (url) => new Promise((resolve, reject) => {
  axios.get(url, (err, response, body) => {
    if (err) {
      return resolve(`error loading ${url}: ${err.message}`)
    } else {
      return resolve(body);
    }
  })
})


module.exports = router;