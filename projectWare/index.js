const express = require('express');
const login = require('./login');
const logout = require('./logout');

const app = express();
const port = 8080;


app.use(express.static('public'));

app.get('/login', async (req, res) => {
  console.log(new Date)
  console.log(req.query)
  login().login(
    req.query
  ).then(() => {
    console.log('login Success')
    res.send('/close')
  }).catch((err) => {
    console.log(err)
  })
})

app.get('/logout', (req, res) => {
  console.log(new Date)
  console.log(req.query)
  logout().logout(
    req.query
  ).then(() => {
    console.log('logout Success')
    res.send(index.html)
  }).catch((err) => {
    console.log(err)
  })
})

app.listen(port, () => {
  console.log('Listening....');
})