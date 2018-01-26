export default class Port {
  constructor (id, Switch, type = 1, N = 10) {
    this.id = id
    this.counter = []
    this.timeSlot = 0
    this.N = N
    this.Switch = Switch
    this.type = type
    this.connected = false
  }

  timesUp () {
    this.timeSlot++
    console.log(`${this.type === 1 ? 'Inout ' : 'Output '} Port Number: ${this.id}, time slot: ${this.timeSlot}'`)
  }

  connect (pair) {
    this.connected = true
    this.counter[pair]--
  }
}
