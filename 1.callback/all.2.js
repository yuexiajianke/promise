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

//其实这样写也不是很好，因为每次都要改数量，还要写个全局的after, 可以用发布订阅模式改写一下

//发布订阅，有两个一个叫发布一个叫订阅
//订阅其实非常简单就是把我要做的事先放到一个数组里[],到时候要干这件事情的时候把组数里的函数以此执行就可以了
//订阅 [fn, fn, fn]
//发布 arr.forEach