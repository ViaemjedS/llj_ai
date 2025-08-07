import { useEffect, useState } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // (async () => {
    //   // 前后端联调
    //   const res = await fetch('http://localhost:8080/api/hello');
    //   const data = await res.json();
    //   console.log(data);
    // })()
  }, [])
  return (
    <>
      <img src='https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ub0tv0o1701242301331/0?max_age=7776000'/>
    </>
  )
}

export default App
