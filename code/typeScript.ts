// 原始数据类型
const a: string = 'james'
const b: number = 100
const c: boolean = true
// const d: number = null
const e: void = undefined //表示没有任何类型
const f: null = null
const g: undefined = undefined

// Symbol 是 ES2015 标准中定义的成员，
// 使用它的前提是必须确保有对应的 ES2015 标准库引用
// 也就是 tsconfig.json 中的 lib 选项必须包含 ES2015
const h: symbol = Symbol()

//object 类型（除了基本类型以外的类型）
const foo: object = {}//[] {}
const obj: { foo: number, bar: string } = { foo: 11, bar: "string" }//可以使用对象字面量语法方式限制类型

//数组类型
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]

//案例 判断参数为数字类型
function sum(...age: number[]) {
    return age.reduce((prev, current) => prev + current, 0)
}
sum(1, 2, 3)

//元组类型 元组中允许存储不同类型的元素，元组可以作为参数传递给函数
//规定每一个类型，以及数组长度
const tuple: [number, string] = [1, 'string']
const age = tuple[0]//1
//元组实例
Object.entries({//返回一个给定对象自身可枚举属性的键值对数组
    foo: 123,
    num: 1111
})

//枚举  使用枚举可以清晰地表达意图或创建一组有区别的用例
//使用数字的话自增加 第一个值（Draft)不指定值默认为0 有默认值从第一个值自增加（Draft 为1 Unpublished为2）
/* enum PostStatus {
    Draft = 0, 
    Unpublished,
    Published
} */
//字符串需要自定义值
// enum PostStatus {
//   Draft = 'aaa',
//   Unpublished = 'bbb',
//   Published = 'ccc'
// }

// 常量枚举，不会侵入编译结果
const enum PostStatus {
    Draft,
    Unpublished,
    Published
}

const post = {
    title: 'Hello TypeScript',
    content: 'TypeScript is a typed superset of JavaScript.',
    status: PostStatus.Draft //0
}

// PostStatus[0] // => Draft

//函数类型
//可选参数与默认参数放在最后面C? 
function fun1(a: number, b: number, c?: number, d: string = 'string', ...rest: number[]): string {
    return 'fun'//string
}
//参数个数必须相同
fun1(1, 2)

const func2: (a: number, b: number) => string = function (a: number, b: number): string {
    return 'func2'
}

//任意类型（弱类型） any类型不安全（轻易不使用）
function stringify(value: any) {
    return JSON.stringify(value)
}


//隐式类型推断
const number1 = 18;
//   number1 = "1231" 报错 默认为number类型

let anyType//默认为any类型
anyType = 100
anyType = "string"


//类型断言
// 假定这个 nums 来自一个明确的接口
const nums = [110, 120, 119, 112]
const res = nums.find(i => i > 0)
// const square = res * res
//语法1 使用as关键字（推荐使用）
const num1 = res as number
//语法2 使用<type> 
const num2 = <number>res // JSX 下不能使用
//类型断言不是类型转换，编译阶段使用编译结束消失


//接口 约定开发规范
interface Post {
    title: string//可以使用分号或者不加
    content: number
    subtitle?: string//可选成员
    readonly summary: string//只读成员
}

function printPost(post: Post) {
    return post
}
let postData: Post = {
    title: 'string',
    content: 1,
    summary: 'info'
}
// postData.summary ='sds'//不可更改
printPost(postData)

interface Cache {
    //prop 可以是任意值 代表key值
    [prop: string]: string
  }
  
  const cache: Cache = {}
  cache.foo = 'value1'
  cache.bar = 'value2'


  //claa 类
  class Person{
      public name:string  // 公有属性
      private age: number //private私有属性 只能在类内部使用
      protected gender:boolean//protected成员在派生类中仍然可以访问(继承类)
      readonly home: string
      constructor(name:string,age:number,gender:boolean,home:string){
          this.name = name
          this.age = age
          this.gender = gender
          this.home = home
      }

      sayHi(msg:string){
          console.log(`my name is ${name}`);
          
      }
  }

  class Student extends Person{
      private constructor(name:string,age:number){//私有类 不能被继承以及创建实例 使用protected可以被继承 
          super(name,age)
        //   console.log(this.age);//访问不了
          console.log(this.gender);//可以访问到
      }

      static create (name: string, age: number) {
        return new Student(name, age)
      }
  }
  const tom = new Person("tom",18,true,"shandong")
//   tom.home = 'beijing' //只读不可被修改
  console.log(tom.name);
//   console.log(tom.age);//访问不到 私有属性
//   console.log(tom.gender);//访问不到
  
//   new Student()//无法创建 有私有类
const jack = Student.create('jack', 18)


//类与接口
interface Eat {
  eat (food: string): void
}
interface Run {
  run (distance: number): void
}
class Persons implements Eat, Run {
  eat (food: string): void {
    console.log(`优雅的进餐: ${food}`)
  }
  run (distance: number) {
    console.log(`直立行走: ${distance}`)
  }
}

class Animal implements Eat, Run {
  eat (food: string): void {
    console.log(`呼噜呼噜的吃: ${food}`)
  }
  run (distance: number) {
    console.log(`爬行: ${distance}`)
  }
}

//抽象类 abstract 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。
abstract class Animals {
    eat (food: string): void {
      console.log(`呼噜呼噜的吃: ${food}`)
    }
    //抽象方法
    abstract run (distance: number): void
  }
  
  class Dog extends Animals {
    run(distance: number): void {
      console.log('四脚爬行', distance)
    }
  
  }
  
  const d = new Dog()
  d.eat('肉')
  d.run(100)


  //泛型 
  //<T>泛型参数 调用的时候传入 泛型参数
  function createArray<T> (length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value)
    return arr
  }
  
  // const res = createNumberArray(3, 100)
  // res => [100, 100, 100]
  
  const array1 = createArray<string>(3, 'foo')

  //类型声明 引用第三方模块 可以使用declare语句声明类型
//   import { camelCase } from 'lodash'
//给引入的camelCase 模块声明类型
// declare function camelCase (input: string): string
