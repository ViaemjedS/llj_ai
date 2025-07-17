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
          <Route path="/user/:id/repos" element={<RepoList/>}/>
          <Route path="*" element={<Navigate to="/user/ViaemJedS/repos"/>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
