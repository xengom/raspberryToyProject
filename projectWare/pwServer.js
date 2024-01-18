const express = require('express');
const login = require('./login');
const logout = require('./logout');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

// Iphone 단축어 유저용
app.get('/login', async (req, res) => {
  console.log(new Date)
  console.log(req.query)
  login().login(
    req.query
  ).then(() => {
    console.log('login Success')
    res.sendFile(__dirname + "/public/result.html")
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
    res.sendFile(__dirname + "/public/result.html")
  }).catch((err) => {
    console.log(err)
  })
})

// web 유저용
app.post('/login', (req, res) => {
  login().login(
    req.body.query
  ).then(()=> {
    console.log('===================')
    console.log(req.body.query);
    console.log(new Date)
    console.log('login Success')
    console.log('===================')
    res.json(req.body.query)
  }).catch((err)=>{
    console.log(err)
  })
})

app.post('/logout', (req, res) => {
  logout().logout(
    req.body.query
  ).then(()=> {
    console.log('===================')
    console.log(req.body.query);
    console.log(new Date)
    console.log('logout Success')
    console.log('===================')
    res.json(req.body.query)
  }).catch((err)=>{
    console.log(err)
  })
})

app.listen(port, () => {
  console.log('Listening....');
})