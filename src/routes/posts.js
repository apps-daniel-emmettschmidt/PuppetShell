// /routes/posts.js
const express = require('express')
const reader = express.Router()


reader.get('/', (req, res, next) => {

    const address = req.body;


  res.send('test' + req.address);
    // 'You have hit GET /posts endpoint')
})

module.exports = reader