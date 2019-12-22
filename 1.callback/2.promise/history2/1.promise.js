// promise 中的链式调用

let fs = require('fs')


function read(...args) {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

read('./content.txt', 'utf8').then(data => {
    console.log(data)
}, err => {
    console.log(err)
})