//我们希望同时读取多个文件内容 将内容组成一个数组

// 串行 并行 异步问题通过回调
let fs = require('fs')

let arr = []

fs.readFile('./age.txt', 'utf8', function (err, data) {
    arr.push(data)
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
    arr.push(data)
})

console.log(arr)