import { 
  useState, 
  useEffect 
} from 'react'
import './App.css'
import {
  getTodos,
  getRepos,
} from '@/api'
function App() {
  const [todos,setTodos] = useState([]);
  const [repos,setRepos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const todosResult = await getTodos();
      // console.log(todosResult);
      // setTodos(todosResult.data.data);
      const reposResult = await getRepos();
      console.log(reposResult);
      setRepos(reposResult.data.data);
    }
    fetchData();
  },[])
  
  return (
    <>
      {/* {
        todos.map(
          <div key={todos.id}>
            {todos.title}
          </div>
        )
      } */}

        <ul>
      {
        repos.map(repo => {
          return (
          <li key={repo.id}>
            {repo.title} <br/>
            {repo.description}
          </li>
          )
        }) 
      }
      </ul>
    </>
  )
}

export default App
