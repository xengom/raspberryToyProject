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
    res.send(`
      ID : ${req.query.id}<br>
      PW : ${req.query.pw}<br>
      출근위치 : ${req.query.loc}<br>
      오 출 완<br>
      오늘 하루도 화이팅
    `)
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
    res.send(`
      ID : ${req.query.id}<br>
      PW : ${req.query.pw}<br>
      출근위치 : ${req.query.loc}<br>
      오 퇴 완<br>
      오늘 하루도 수고하셨습니다.
    `)
  }).catch((err) => {
    console.log(err)
  })
})

app.listen(port, () => {
  console.log('Listening....');
})