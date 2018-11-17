const router = require('express').Router();
const axios = require('axios');

// const getContents = (url) => new Promise((resolve, reject) => {
//   axios.get(url, (err, response, body) => {
//     // if (err) {
//     //   console.log('err in get contents', err)
//     //   return reject(`error loading ${url}: ${err.message}`)
//     // } else {
//     //   console.log('getContents response', response.data)
//     //   console.log('getContents body', body)
//     //   return resolve(body);
//     // }
//   })
//   .then(response => {
//     // console.log('response ****&*&(*&(*&', response.data)
//     return resolve(response.data)
//   })
//   .catch(err => {
//     // console.log('err *&)^(^$(&^&)_((&^$', err)
//     return reject(err)
//   })
// })

// router.get('/getChat', (req, res) => {
//   Promise.all([
//     getContents('http://localhost:3000/chat/getChat')
//   ])
//   .then(responses => {
//     console.log('responses', responses)
//     res.send(responses[0])

//   })
//   .catch(err => {
//     // res.send(err.message)  
//     console.log('err rejection from getContents in router.get', err)
//   })
// })



module.exports = router;