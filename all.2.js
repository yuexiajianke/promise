//我们希望同时读取多个文件内容 将内容组成一个数组

// 串行 并行 异步问题通过回调
let fs = require('fs')

function after (callback, times) {
    let arr = [] // 多个异步的结果会被保存到数组中
    return function (data) { // out
        if (--times === 0) { // 如果调用次数达到
            callback() // 将储存的结果传递出去
        }
    }
}

function fn (arr) {
    console.log(arr)
}

let out = after(fn, 2)

fs.readFile('./age.txt', 'utf8', function (err, data) {
    arr.push(data)
    out()
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
    arr.push(data)
    out()
})
