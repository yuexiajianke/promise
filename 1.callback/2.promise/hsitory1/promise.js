
const PEDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

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
        if (this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.resason)
        }
        // 有可能我调用then的时候 当前promise 没有成功也没有失败
        if (this.status === PEDING) {
            //如果是等待状态我需要将 onFilled 和 onRecjected 分别存放起来   
            this.onResolvedCallbacks.push(() => {
                // todo....
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.resason)
            })
        }
    }



}

module.exports = Promise //将Promise类暴露出去