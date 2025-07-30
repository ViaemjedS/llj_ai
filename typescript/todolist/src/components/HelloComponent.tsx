import React from 'react'

// 如何约束函数的返回值为ReactNode? JSX
// FC == FunctionComponent
// 定义组件 props 接口
// 如何约定字节需要一个name
interface Props {
  name: string;
}

// typescript 类型约束，重要的地方一定要约束
// 参数， 返回值
// 泛型 泛指内部的类型
// 泛型
const HelloComponent:React.FC<Props> = (props) => {
    // const { name } = props
    return (
        <h2>Hello user:{props.name}</h2>
    )
}

export default HelloComponent