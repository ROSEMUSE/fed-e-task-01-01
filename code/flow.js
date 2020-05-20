//@flow
function sum(a:number,b:number){
    return a+b
}
 sum(100,1000)

 function square(n){
     return n*n
 }
 square('1')

//数组
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]
// 元组
const foo: [string, number] = ['foo', 100]

//对象
const obj1: { foo: string, bar: number } = { foo: 'string', bar: 100 }
const obj2: { foo?: string, bar: number } = { bar: 100 }
const obj3: { [string]: string } = {}
obj3.key1 = 'value1'
obj3.key2 = 'value2'
//函数
function foo (callback: (string, number) => void) {
    callback('string', 100)
  }
  
  foo(function (str, n) {
    // str => string
    // n => number
  })


// 声明类型
type StringOrNumber = string | number
const b: StringOrNumber = 'string' // 100

// Maybe 类型 
const gender: ?number = undefined
// 相当于
// const gender: number | null | void = undefined

