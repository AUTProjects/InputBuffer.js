import Port from './port'

export default class InputPort extends Port {
  constructor (id, Switch, N = 10) {
    super(id, Switch, 1, N)
  }

  onPacketArrived (outputId) {
    if (this.counter[outputId] === undefined) {
      this.counter[outputId] = 1
    } else {
      this.counter[outputId] += 1
    }
  }

  onGrant(output){
      this.grants.push(output)
  }

  accept () {
    if (this.connected || this.grants.length === 0) {
      return
    }
    let j = this.grants.reduce(function (a, b) {
      if (this.calculateRR(a) < this.calculateRR(b)) {
          return a
        } else {
          return b
        }
    }.bind(this))


    if (!this.Switch.outputs[j].connected){
      this.Switch.onAccept(this.id, j)
    }

    this.grants = []
  }
}
