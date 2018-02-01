import InputPort from './input'
import OutputPort from './output'

export default class Switch {
  constructor (N) {
    this.inputs = []
    this.outputs = []
    this.grants = []
    this.accepts = []
    this.match = {}
    for (let n = 0; n < N; n++) {
      this.inputs.push(new InputPort(n, this, N))
      this.outputs.push(new OutputPort(n, this, N))
    }
  }

  switching (iteration, packets) {
    this.match = {}
    this.onPacketArrived(packets)
    while (iteration > 0) {
      this.itrate()
      iteration--
    }
  }

  itrate () {
    this.grant()
    this.accept()
  }


  grant () {
    this.outputs.forEach((output, key) => {
      output.grant()
    })
  }

  accept () {
    this.inputs.forEach((intput,key)=>{
      intput.accept()
    })


    this.accepts.forEach((accept, key) => {
      console.log(`Input ${key} accepts ${accept}`)
      this.inputs[key].connect(accept)
      this.outputs[accept].connect(key)
      this.match[key] = accept
    })
    this.accepts = []
  }

  onPacketArrived (packets) {
    if (packets === undefined) {
      return
    }
    packets.forEach((packet) => {
      if (packet.in !== undefined && packet.out !== undefined &&
        this.inputs[packet.in] !== undefined && this.outputs[packet.out] !== undefined) {
        this.inputs[packet.in].onPacketArrived(packet.out)
        this.outputs[packet.out].onReport(packet.in)
      }
    })
  }

  onGrant (input, output) {
    console.log(this.outputs[output].id+" grants "+ this.inputs[input].id)
    this.inputs[input].grants.push(output)
  }

  onAccept (input, output) {
    console.log(this.inputs[input].id+" accepts "+ this.outputs[output].id)
    this.accepts[input] = output
    this.outputs[output].accepted = true
  }

  timesUp () {
    [...this.inputs, ...this.outputs].forEach((port) => {
      port.timesUp()
    })
  }
}
