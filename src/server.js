import Switch from './Switch'

const jayson = require('jayson')

// create a server
const server = jayson.server({
  'Algorithm.Iterate': function (args, callback) {
    console.log(args)

    // Create new switch
    const _switch = new Switch(10)

    // Go to current timeslot
    for (let i = 0; i < args.T; i++) {
      _switch.timesUp()
    }

    // Adds all packets
    const packets = []
    for (let input = 0; input < args.N; input++) {
      for (let output = 0; output < args.N; output++) {
        for (let n = 0; n < args.Ports[input][output]; n++) {
          packets.push({
            in: input,
            out: output
          })
        }
      }
    }
    _switch.switching(1, packets)

    console.log(_switch.match)

    // send back port matching
    callback(null, _switch.match)
  }
})

server.http().listen(3000)
