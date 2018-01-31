import Switch from './Switch'

const jayson = require('jayson')

const _switch = new Switch(10)

// create a server
var server = jayson.server({
  'Algorithm.Iterate': function (args, callback) {
    console.log(args)
    callback(null, args[0] + args[1])
    _switch.timesUp()
  }
})

server.http().listen(3000)
