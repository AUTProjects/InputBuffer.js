import InputPort from './input'
import OutputPort from './output'

export default class Switch {
  constructor (N) {
    this.inputs = []
    this.outputs = []
    this.grants = []
    this.accepts = []
    for (let n = 0; n < N; n++) {
      this.inputs.push(new InputPort(n, this, N))
      this.outputs.push(new OutputPort(n, this, N))
    }
  }

  switching (iteration, packets) {
    this.onPacketArrived(packets)
    while (iteration - 1 > 0) {
      this.itrate()
      iteration--
    }
  }

  itrate () {
    this.outputs.forEach(output => output.grant())
    this.accept()
  }

  accept () {
    this.accepts.forEach((accept, key) => {
      console.log(`Input ${key} accepts ${accept}`)
      this.inputs[key].connect(accept)
      this.outputs[accept].connect(key)
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
    this.accept()
  }

  onGrant (input, output) {
    this.inputs[input].accept(output)
  }

  onAccept (input, output) {
    this.accepts[input] = output
  }

  timesUp () {
    [...this.inputs, ...this.outputs].forEach((port) => {
      port.timesUp()
    })
  }
}
