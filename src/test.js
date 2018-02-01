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
    _switch.switching(2 //number of iterations
    , [
      {in: 1, out: 8},
      {in: 2, out: 4},
      {in: 3, out: 6},
      {in: 4, out: 5},
      {in: 5, out: 5},
      {in: 6, out: 8},
      {in: 7, out: 2},
      {in: 8, out: 3},
    ] //packets
    )
  }
)
