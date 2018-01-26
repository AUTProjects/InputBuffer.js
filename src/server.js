import Switch from './Switch'

const express = require('express')
const app = express()
const _switch = new Switch(10)

app.get('/', function (req, res) {
  _switch.timesUp()
  res.send('OK!')
}
)

app.listen(4322, function () {
  console.log('Example app listening on port 4322!')
  _switch.switching(2, [
    {in: 1, out: 2},
    {in: 5, out: 2},
    {in: 1, out: 2},
    {in: 1, out: 3},
    {in: 1, out: 3},
    {in: 1, out: 3},
  ])
}
)
