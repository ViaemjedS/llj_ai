import { 
  useState,
  lazy,
  Suspense
} from 'react'
import './App.css'
import {
  BrowserRouter as Router, // 前端路由
  Routes, // 路由设置容器
  Route, // 单条路由
} from "react-router-dom";

import ProtectRoute from './pages/ProtectRoute';
import Nav from './components/Nav';
import Pay from './pages/Pay';

// import Home from './pages/Home'
// import About from './pages/About'
// 30几个页面

// 函数 路由 => Route 
// 新的组件
// 懒加载
const Home = lazy(() => import('./pages/Home')); // lazy会返回一个新组件
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));

function App() {

  return (
    <>
      <Router>
        <Nav/>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />  {/* 此时的Home不是之前的Home组件了 */}
            <Route path="/about" element={<About />} />
            {/* 鉴权 */}
            <Route path="/login" element={<Login />} />
            <Route path="/pay" element={
              <ProtectRoute>
                <Pay />
              </ProtectRoute>
            } />
            <Route path='*' element={<NotFound />} /> 
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
