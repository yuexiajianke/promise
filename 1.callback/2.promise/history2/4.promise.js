let Promise = require('./promise')
// 1) 普通值的情况

let promise = new Promise((resolve, reject) => {
    resolve()
})

let promise2 = promise.then(() => {
    return 1000
})

promise2.then(data => {
    console.log(data, 'xxxx')
})