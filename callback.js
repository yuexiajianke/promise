//  js 里最核心的技能回调函数
// 高阶函数 （函数当做参数传递给另一个函数）一个函数返还另一函数
// 比如常见的例子，检测数据类型 typeof，但是typeof只能检测基础数据类型，不能检测 object/array 还有null
// 除了这种方法以外我们常用的方法市object.prototype.toString.call() 但是这个方法也有些缺陷，不能判断
// 谁是谁的实例，之后又衍生出一些方法 instanceof constructor

// function isType(content, type) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }

// isType('hello', 'String')

//每次要传'String', 麻烦 柯里化

//属性私有化,type 会被保存起来
//必包 1函数执行的时候 会有一个不销毁的内存空间， 函数不在定义的作用域内执行，就会产生一个必包
function isType(type) { //这里有一个必包 type会保留在当前上下文中
    return function (content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let isString = isType('String')
let isBoolean = isType('Boolean')
console(isString('hello'))
console(isBoolean(true))

//写一个工具类，批量产生一些方法
let util = {}
['String', 'Boolean', 'Undefined'].forEach((type) => {
    util['is' + type] = isType(type)
})

console(util.isString('hello'))
console(util.isBoolean(true))
