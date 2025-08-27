// js 弱类型，容易出问题  
// ts 带来类型的约束
// ts 是微软 想让Java工程师写前端
// react + ts 是开发的标配
// 自定义类型
// interface
interface UserDemo {
    name: string;
    age: number;
}

// 相同点, 都可以声明
type UserType = {
    name: string;
    age: number;
}

const u1: UserDemo = { name: 'Alice', age: 19 }
const u2: UserType = { name: 'Bob', age: 22 }