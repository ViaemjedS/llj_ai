import { useState } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Routes,
  Route, // 前端路由二选一
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {

  return (
    <>
      <Router>
        {/* <nav>
          <ul>
              <li><a href="./">Home</a></li>
              <li><a href="./about">About</a></li>
          </ul>
        </nav> */}

        {/* 用Link代替a标签 */}
        <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
