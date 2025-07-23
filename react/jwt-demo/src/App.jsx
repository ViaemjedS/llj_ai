import { 
  useState,
  useEffect,
  lazy,
  Suspense
} from 'react'
import './App.css'

import {
  getUser
} from './api/user'
import {
  Routes,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
const Home = lazy(() => import('./views/Home'))
const Login = lazy(() => import('./views/Login'))
const Pay = lazy(() => import('./views/Pay'))
const RequireAuth = lazy(() => import('./components/RequireAuth'))
function App() {
  useEffect (() => {
    // (async () => {
    //   const res = await getUser();
    //   console.log(res)
    // })()
  },[])
  return (
    <>
        
        <NavBar />
        <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/pay' element={
            <RequireAuth>
              <Pay />
            </RequireAuth>
          }>
          </Route>
        </Routes>
        </Suspense>
    </>
  )
}

export default App
