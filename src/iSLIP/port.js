export default class Port {
  constructor (id, Switch, type = 1, N = 10) {
    this.id = id
    this.counter = []
    this.timeSlot = 0
    this.N = N
    this.Switch = Switch
    this.type = type
    this.rr = 1
    this.connected = false
    this.grants = []
  }

  calculateRR (pointer) {
    const diff = this.rr - pointer
    return diff >= 0 ? diff : diff + this.N
  }

  timesUp () {
    this.timeSlot++
    console.log(`${this.type === 1 ? 'Input ' : 'Output '} Port Number: ${this.id}, time slot: ${this.timeSlot}'`)
  }

  connect (pair) {
    this.connected = true
    this.counter[pair]--
    this.counter = []
    this.rr = ((parseInt(pair) + 1) % this.N) + 1
  }
}
