import Port from './port'

export default class OutputPort extends Port {
  constructor (id, Switch, N = 10) {
    super(id, Switch, 2, N)
    this.connected = false
  }

  onReport (inputId) {
    if (this.counter[inputId] === undefined) {
      this.counter[inputId] = 1
    } else {
      this.counter[inputId] += 1
    }
  }

  grant () {
    if (this.connected || this.counter.length === 0) {
      return
    }

      let j = Object.keys(this.counter).reduce(function (a, b) {
        // console.log(this.id+" "+a+" "+b+" "+this.calculateRR(a)+" "+this.calculateRR(b)+" "+this.N)
        if (this.calculateRR(a) < this.calculateRR(b)) {
          if (!this.Switch.inputs[a].connected) {
            return a
          } else {
            return b
          }
        }else{
          if (!this.Switch.inputs[b].connected) {
            return a
          } else {
            return b
          }
        }
      }.bind(this))

    if (this.counter[j] !== undefined && this.counter[j] !== 0 &&
      !this.Switch.inputs[j].connected) {
      this.Switch.onGrant(j, this.id)
    }
  }
}
