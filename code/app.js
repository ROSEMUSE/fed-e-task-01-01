//let 
// console.log(i);报错 没有声明提示
/* for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i); //产生块级作用域
    }, 0)
} */

//const 只读
/* const name = 'aaa'
name = 'jack'//不允许被修改内存指向
console.log(name);
const obj = {}
obj[name] = 'james'//可以修改属性值
obj = {} //报错 修改了内存指向
console.log(obj); */

//数组解构
/* const arr = [10, 20, 30]
const [foo, bar, baz] = arr 
console.log(foo, bar, baz)

const [, , baz] = arr //获取最后一个值
console.log(baz) 

const [foo, ...rest] = arr //只能最后位置使用 
console.log(rest) //解构新数组 [20,30]

const [foo, bar, baz, more] = arr //多余的会显示undefind
console.log(more)

const [foo, bar, baz = 123, more = 'default value'] = arr// 默认值
console.log(bar,baz, more) */


//对象解构
/* const obj = { name: 'zce', age: 18 }

const { name } = obj
console.log(name)

const name = 'tom'
const { name: objName } = obj  //重命名
console.log(objName)

const name = 'tom'
const { name: objName = 'jack' } = obj //默认值
console.log(objName)
 */


//模版字符串
/* const name = 'tom'
// 可以通过 ${} 插入表达式，表达式的执行结果将会输出到对应位置
const msg = `hey, ${name} --- ${1 + 2} ---- ${Math.random()}`
console.log(msg) */

// 带标签的模板字符串
// 模板字符串的标签就是一个特殊的函数，
// 使用这个标签就是调用这个函数
// const str = console.log`hello world`

/* const name = 'tom'
const gender = false

function myTagFunc (strings, name, gender) {
  // console.log(strings, name, gender)
  // return '123'
  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}
const result = myTagFunc`hey, ${name} is a ${gender}.`
console.log(result) */



//参数默认值
// 默认参数一定是在形参列表的最后，规范
/* function foo (enable = true) {
    console.log('foo invoked - enable: ')
    console.log(enable)
  }

foo(false) */



//剩余参数
/* function foo (first, ...args) {
    console.log(args) //数组【2，3，4】
  }
  
  foo(1, 2, 3, 4) */




//箭头函数与this
//箭头函数this始终指向当前作用域的this
/* const obj = {
    name:'jack',
    sayHi:function(){
        console.log(this.name); //this指向obj
    },
    sayName:()=>{
        console.log(this.name); //this 指向window
    },
    sayName:function(){
        setTimeout(()=>{
            console.log(this.name);  //定时器当前作用域 sayName 函数 sayName函数this 指向调用它的obj    
        },0)
    }
}
obj.sayHi() //jack
obj.sayName() //undefind */



//对象字面量
/* const bar = '345'
const obj = {
  foo: 123,
  // bar: bar
  // 属性名与变量名相同，可以省略 : bar
  bar,
  // method1: function () {
  //   console.log('method111')
  // }
  // 方法可以省略 : function
  method1 () {
    console.log('method111')
    // 这种方法就是普通的函数，同样影响 this 指向。
    console.log(this)
  },
  // Math.random(): 123 // 不允许
  // 通过 [] 让表达式的结果作为属性名
  [1+1]: 123
}

// obj[Math.random()] = 123

console.log(obj)
obj.method1() */



//assign  object.is
/* function func (obj) {
    const funcObj = Object.assign({}, obj) //复制新对象
    funcObj.name = 'func obj'//修改不会影响之前对象
    console.log(Object.is(funcObj,obj)) //false 确定两个值是否相同
    Object.is(NaN, NaN)     // => true
    Object.is(+0, -0)       // => false
    //一般建议使用严格相等运算符
}
  const obj = { name: 'global obj' }
  func(obj)
  console.log(obj) */





// Proxy 对象
/* const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {
  // 监视属性读取 
  get (target, property) {
   console.log(target, property);
  },
  // 监视属性设置 target 目标对象 property 将被设置的属性名或 Symbol value 新属性值
  set (target, property, value) {
    if (property === 'age') {
      if (!Number.isInteger(value)) {//判断是否number
        throw new TypeError(`${value} is not an int`)
      }
    }
    target[property] = value
  }
})
console.log(personProxy.name);
personProxy.age = 23 */

// Proxy 对比 Object.defineProperty() ===============

// 优势1：Proxy 可以监视读写以外的操作 --------------------------
/* const person = {
  name: 'zce',
  age: 20
}
const personProxy = new Proxy(person, {
//拦截 delete 操作 property待删除的属性
  deleteProperty (target, property) {
    console.log('delete', property)
    delete target[property]
  }
})
delete personProxy.age
console.log(person) */

// 优势2：Proxy 可以很方便的监视数组操作 --------------------------
/* const list = []
const listProxy = new Proxy(list, {
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
    return true // 表示设置成功
  }
})
listProxy.push(100)
listProxy.push(100) */

// 优势3：Proxy 不需要侵入对象 --------------------------
/* const person = {}
Object.defineProperty(person, 'name', { //需要单独监听对象属性 如果需要监听多个属性需要做多个操作
  get () {
    console.log('name 被访问')
    return person._name
  },
  set (value) {
    console.log('name 被设置')
    person._name = value
  }
})
Object.defineProperty(person, 'age', {
  get () {
    console.log('age 被访问')
    return person._age
  },
  set (value) {
    console.log('age 被设置')
    person._age = value
  }
})
person.name = 'jack'
console.log(person.name) */

// Proxy 方式 监听整个对象，节约很多代码
/* const person2 = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person2, {
    get(target, property) {
        console.log('get', property)
        return target[property]
    },
    set(target, property, value) {
        console.log('set', property, value)
        target[property] = value
    }
})
personProxy.name = 'jack'
console.log(personProxy.name) */




//Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。Reflect不是一个函数对象，因此它是不可构造的。
/* const obj = {
  foo: '123',
  bar: '456'
}
const proxy = new Proxy(obj, {
  get (target, property) {
    console.log('watch logic~')
    return Reflect.get(target, property)
  }
})
console.log(proxy.foo) */

/* const obj = {
    name: 'zce',
    age: 18
}
// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))
//统一提供一套用于操作对象的API  
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj)) */





//class 语法
/* class Person {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(`my name is${this.name}`);
    }
    static play() {//定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用
        console.log('Person  play');
    }
}
class Student extends Person {
    constructor(name, number) {
        super(name) // 父类构造函数
        this.number = number
    }
    hello() {
        super.sayName() // 调用父类成员
        console.log(`my school number is ${this.number}`)
    }
}
const tom = new Student('tom', 12)
tom.hello()
//   tom.play() //无法调用
Student.play() //调用方式 */





//Set对象：允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
/* const set = new Set([1, 2, 3, 4, 5]);//返回一个新的Set对象。
console.log(set.has(1));//true  返回一个布尔值，表示该值在Set中存在与否。
console.log(set.has(8));//false

//set 数组去重
const arr = [1, 2, 1, 3, 4, 1]
const set1 = new Set(arr);
console.log([...set1]);//set 对象转换成数组 */



//Map对象：保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。
/* let myMap = new Map();
let keyObj = {};
let keyFunc = function() {};
// 添加键（可以任意类型值）
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
myMap.size; // 3
let { log } = console;
// 读取值
log(myMap.get(keyObj));       // "和键keyObj关联的值"
log(myMap.get(keyFunc));      // "和键keyFunc关联的值" */




//Symbol 是一种基本数据类型 每个从Symbol()返回的symbol值都是唯一的
/* const s =  Symbol(['a'])
console.log(s);
console.log(Symbol('foo') === Symbol('foo'));//false 唯一性
//全局共享
console.log(Symbol.for('a') === Symbol.for('a'));//true for方法 传入字符串 其他类型会转换成字符串 */



//for of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环
/* const myMap = new Map()
myMap.set({a:1}, "对象");
myMap.set(function(){}, "函数");
for(const [key, value] of myMap){
    console.log(key,value);
    if(value === "对象"){
        break//可以由break, throw  continue    或return终止
    }  
} */



// Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用
/* const set = new Set(['foo', 'bar', 'baz'])
const iterator = set[Symbol.iterator]() 
console.log(iterator.next()); // 返回值{ value: 'foo', done: false } */




// 迭代器设计模式
/* const myObject = {
    store:['foo','bar','baz'],
    [Symbol.iterator]:function(){
        let index = 0
        return {
            next:()=>{
                const result = {
                    value: this.store[index],
                    done:index>=this.store.length
                }
                index++
                return result;
            }
        }
    }
}

for(const value of myObject){
    console.log(value);
}
console.log( myObject[Symbol.iterator]().next());//{ value: 'foo', done: false } */




//Promise 
/* 状态：
pending: 初始状态，既不是成功，也不是失败状态。
fulfilled: 意味着操作成功完成。
rejected: 意味着操作失败。 */
/* const promise = new Promise(function (resolve, reject) {
    // 这里用于“兑现”承诺
    resolve(100) // 承诺达成
    // reject(new Error('promise rejected')) // 承诺失败
})
promise.then(function (value) {
    // 即便没有异步操作，then 方法中传入的回调仍然会被放入队列，等待下一轮执行
    console.log('resolved', value)
    // return 1//普通值作为后面then方法参数
    return new Promise((resolve) => {
        resolve("promise")
    })

}, function (error) {
    console.log('rejected', error)
}).then((value) => {
    console.log(value);//1  如果返回peomise对象 会等待 promise 完成（等同于return peomise的then)
    console.log(a);

}).catch((res) => {//捕获错误
    console.log(res);//a is not defined
})
console.log('end') */
/* //所有的promise对象都成功的时候才会触发成功
Promise.all([primse1, promise2]).then((values) => {
    values为数组所有promise对象值的集合
})
//当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。
Promise.race([primse1, promise2])
    .then(value => {
        console.log(value)
    }) */






// 生成器函数回顾
/* function * foo () {
    console.log('start')
    try {
      const res = yield 'foo'//暂停生成器执行
      console.log(res)//bar
    } catch (e) {
      console.log(e)
    }
  }
  const generator = foo()
  const result = generator.next()//{ value: 'foo', done: false }
  console.log(result)
  console.log(generator.next('bar'));
//   generator.throw(new Error('Generator error')) */






//async function 用来定义一个返回 AsyncFunction 对象的异步函数
/* function resolve() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 0);
    });
  }
  
  async function asyncCall() {
    console.log('start');
    const result = await resolve();//resolved 如果是 Promise await 将等待 Promise 正常处理完成并返回其处理结果
    const result1 = await 1; //1 如果该值不是一个 Promise，await 会把该值转换为已正常处理的Promise，然后等待其处理结果（返回该自身值）x。
    console.log(result,result1);
  }
  asyncCall() */
  //面试题
  /* async function t1(){
      let a = await fn().then((res)=>{
          return res
      })
      console.log(a); //fn 没有返回值 返回undefind（等同于resolve()）有值的情况 1. 如果是promise 返回resolve或reject处理的值 2. 如果不是 会把该值转换为已正常处理的Promise 返回其结果（自身值）
  }
  async function fn(){
      await new Promise((reslove)=>{
          reslove('lagou')
      })
      return 'aaaa'
  }
  t1() */




  //js弱类型产生的问题
/* const obj = {}
obj.foo()//只有在运行时才会报错 */

/* function sum(a,b){
    return a+b
    //不会检查变量类型,导致不是想要的结果
}
console.log( sum(100,'100')); */

//无法约定类型
/* const obj = {}
obj[true] = 100
console.log(obj['true']);
 */