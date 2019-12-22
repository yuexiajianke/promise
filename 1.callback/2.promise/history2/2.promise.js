// promise 中的链式调用

let fs = require('fs')

// 1) 先将代码包装成promise的
let promisify = (fn) => { // fs.readFile
    return (...args) => { // read
        return new Promise((resolve, reject) => {
            fs.readFile(...args, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}

let read = promisify(fs.readFile)
read('./content.txt', 'utf8').then(data => {
    console.log(data)
}, err => {
    console.log(err)
})