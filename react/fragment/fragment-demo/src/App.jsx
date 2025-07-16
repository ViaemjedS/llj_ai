import { 
  useState,
  Fragment  // 组件
} from 'react'
import './App.css'

function Demo({items}){

  // return (
  //   // DOM 树多了一层不需要的节点， DOM 解析性能下降， 多迭代一层
  //     <Fragment>
  //     <h1>Hello</h1>
  //     <p>你好</p>
  //     </Fragment>
  // )
  return (items.map(item => (
        <Fragment key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </Fragment>
      ))
  )
}
function App() {
  const items = [{
    id:1,
    title: '标题',
    content:'内容1'
  },
  {
    id:2,
    title: '标题',
    content:'内容2'
  }]
  return (
    <>
      <Demo items={items} />
    </>
  )
}

export default App
