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

  accept (outputId) {
    let j = (this.timeSlot + this.id) % this.N
    if (this.accepted === undefined || outputId === j.toString() || this.counter[outputId] > this.counter[this.accepted]) {
      this.accepted = outputId
      this.Switch.onAccept(this.id, outputId)
    }
  }
}
