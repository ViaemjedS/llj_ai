import { 
  useState, 
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  console.log('App render')
  const expensiveComputation =  (n) => {
    for(let i = 0;i < 1000000;i++) {
      i++;
    }
    console.log('expensiveComputation')
    return n*2;
  }
  const result = useMemo(() => expensiveComputation(num), [num])

  useEffect(() => {
    console.log('count', count)
  }, [count])

  useEffect(() => {
    console.log('num', num)
  }, [num])

  // rerender 重新生成
  // 不要重新生成，和useEffect [] 一样
  // callback 回调函数 缓存
  const handleClick = useCallback(() => {
    console.log('handleClick')
  }, [num]) 

  return (
    <>
      {/* <div>{expensiveComputation(num)}</div> */}
      <div>{result}</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Count+</button>
      <br />
      <button onClick={() => setNum(num + 1)}>Num+</button>
      <br />
      <Button num={num} onClick={handleClick}>Click Me</Button>
    </>
  )
}

export default App
