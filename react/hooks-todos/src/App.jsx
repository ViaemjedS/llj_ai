import { useState } from 'react'
import Todos from './components/Todos'

function App() {
  
    return (
      <>
        {/* 开发的任务单位就是组件 */}
        {/* <div style={{fontSize: '12px',width:'5rem',height:'5rem',background:'white'}}></div> */}
        {/* <div style={{fontSize:'14px',width:'3.5714em',height:'3.5714em',background:'red'}}></div> */}
        <Todos />
        
      </>
    )
}

export default App
