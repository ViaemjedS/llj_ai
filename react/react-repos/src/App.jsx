import { 
  useState,
  useEffect,
  Suspense,
  lazy
} from 'react'
import {
  Route,
  Navigate,
  Routes
} from 'react-router-dom'
import './App.css'
import Loading from './components/Loading'

// import {
//   getRepos,
//   getRepoDetail
// } from './api/repos'
const RepoList = lazy(() =>import('./pages/RepoList'))
const RepoDetail = lazy(() =>import('./pages/RepoDetail'))
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
function App() {
  // useEffect(() => {
  //   (async () => {
  //     const repos = await getRepos('ViaemJedS');
  //     const repo = await getRepoDetail('ViaemJedS','ai_lesson');
  //     console.log(res);
  //   })();

    // return () => {
    //   console.log('----')
    // }
  // }, []);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/users/:id/repos" element={<RepoList/>}/>
          <Route path="/users/:id/repos/:repoId" element={<RepoDetail/>}/>
          {/* <Route path="*" element={<Navigate to="/user/ViaemJedS/repos"/>}/> */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
