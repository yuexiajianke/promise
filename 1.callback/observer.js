class Subject {
    constructor (name) {
        this.name = name
        this.state = '心情很美丽'
        this.arr = []
    }
    attach (o) {
        this.arr.push(o)
    }
    setState(newState) {
        if (this.state !=== newState) {
            this.state = newState
            this.arr.forEach(o => o.update(newState))
        }
    }
} 
class Observer {
    constructor (name) {
        this.name = name
    }
    update (newState) {
        console.log(this.name + '收到了小宝宝的最新状态是' + newState)
    }
}

let s = new Subject('小宝宝')
let o = new Observer('我')
let o1 = new Observer('我妈')

s.attach(o)
s.attach(o1)
s.setState('心情不美丽')