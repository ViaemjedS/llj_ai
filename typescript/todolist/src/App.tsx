import './App.css'
import HelloComponent from './components/HelloComponent.tsx'
// react + typescript 
// JavaScript 可能会有一些问题, 主要因为弱类型
// jsx 后缀改成tsx

// 函数进行类型约束
// const HelloComponent = () => {
//   // void 空  ReactNode
//   return 1
// }
function App() {
  // 编译阶段
  // 多写了些类型声明的文件
  // 多写一些代码
  let count:number = 10;
  const title:string = "Hello ts";
  const isDone:boolean = true;
  const list:number[] = [1, 2, 3];
  // 元祖类型
  const  tuple:[string, number] = ["万炫雨", 19];
  // 枚举类型
  enum Status {
    Pending,
    Fullfilled,
    Rejected
  }
  const pStatus:Status = Status.Pending; 
  // 对象的约束
  // 接口类
  interface User {
    name:string;
    age:number;
    isSingle?:boolean;
  }
  // 使用interface 来约定类型
  const user:User = {
    name: "旺萱语",
    age: 19,
    isSingle:true,
  }
  return (
    <>
      {count}
      {title}
      {user.name} {user.age}
      {/* typescript 很严格 */}
      <HelloComponent name="kenny"/>
    </>
  )
}

export default App
