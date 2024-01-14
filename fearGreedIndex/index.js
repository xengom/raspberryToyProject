const express = require('express');
const getFGI = require('./getFGI');

const app = express();
const port = 8081;

app.get('/', async (req, res) => {
  const result = new Promise((resolve, reject) => {
    resolve(getFGI.getFearAndGreedIndex());
  })
  result.then((value) => {
    console.log(value)
    value ? res.json(value) : res.json({score:'NaN',rating:'NaN'})
  })
})

app.listen(port, () => {
  console.log('Listening....');
})