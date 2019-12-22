// 我们希望在原有的功能上增加一些方法
// Vue.mixin

function say(whoV {
    console.log(who+'说话')
}

Function.prototype.before = function (callback) {
    // this = say
    return (...args) => { // 箭头函数没有arguments 剩余运算符
        callback()
        this(...args) //把数组展开 依次传入到say方法中
    }
}

let fn = say.before(function () {
    console.log('before say')
})

fn('小狗')

// vue中的数组的方法重写 函数劫持 