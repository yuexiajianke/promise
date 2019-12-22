
const PEDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) { //说明死循环了 直接拒绝即可
        return reject(new TypeError('xx'))
    }
    // 接下来 要判断x的类型 是promise还是普通值
    // 如果x 不是对象也不是函数 string null undefined
    let called
    if ((typeof x == 'object' && typeof x !== null) || typeof x === 'function') {
        // 如何判断一个对象是不是promise, promise的特点必须要有then方法
        try { // 有可能这个then方法在别人的promise中是通过defineProperty定义的取值的时候可能
            //会发生异常，那就让这个promise2变成失败即可
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => { //解析y保证它是一个普通值
                    if (called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) {
                        return
                    }
                    called = true
                    reject(r)
                })
            } else { // { x: then: 123}
                resolve(x)
            }
        } catch (e) {
            if (called) {
                return
            }
            called = true
            reject(e)
        }
    } else {
        // x 就是一个普通值
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PEDING
        this.value = undefined // 成功的原因
        this.resason = undefined // 失败的原因

        this.onResolvedCallbacks = [] // 存储成功的回调
        this.onRejectedCallbacks = [] // 存储失败的回调

        let resolve = (value) => { //成功的函数 
            if (this.status === PEDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => { //    失败的函数
            if (this.status === REJECTED) {
                this.status = REJECTED // 改变状态
                this.reason = resason // 改变原因
                this.onRejectedCallbacks.forEach(fn => fn())
            }

        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)

        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        // 递归每次调用then的时候 都返回一个新的promise2
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject) //只需要拿到then的返回结果 直接将这个值传递给promise2即可
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.resason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            // 有可能我调用then的时候 当前promise 没有成功也没有失败
            if (this.status === PEDING) {
                //如果是等待状态我需要将 onFilled 和 onRecjected 分别存放起来   
                this.onResolvedCallbacks.push(() => {
                    // todo....
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promsie2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.resason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }



}

module.exports = Promise //将Promise类暴露出去