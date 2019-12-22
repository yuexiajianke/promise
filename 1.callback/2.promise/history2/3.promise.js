// promise 中的链式调用

let fs = require('fs')
let { promisify } = require('util')
let read = promisify(fs.readFile)

// promise 特性 then方法中传递的函数 成功、失败这两个函数的返回值可以返回一个promise
// 如果返回的是一个promise的话，会用这个promise的状态作为下一次then的结果
// 如果自己有捕获错误，它就不会找catch
// 这个函数还可以返回普通值 只要不是error, 不是promise 都叫普通值 会将这个值作为下一次then的结果

// 1）返回的是promise 2. 抛出错误 3.返回的是普通值
read('./content.txt', 'utf8').then(data => {
    return read(data, 'utf8')
}, err => {
    console.log(err)
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err) //专门用来捕获错误的
})

//链式调用的实现 是每一次都返回一个新的promise jquery返回this