// /routes/posts.js
const express = require('express')
const reader = express.Router()


reader.get('/', (req, res, next) => {

  const address = req.query.address;

  res.send('Heard ' + address);
    // 'You have hit GET /posts endpoint')
})

module.exports = reader