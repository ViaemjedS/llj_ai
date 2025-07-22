import { useState } from 'react'
import './App.css'
import Counter from '@/components/Counter'
import { useConterStore } from '@/store/count'
import TodoList from '@/components/TodoList'
import RepoList from '@/components/RepoList'
function App() {
  const {count} = useConterStore()
  return (
    <>
      App 中的{count}
      <Counter />
      <TodoList />
      <RepoList />
    </>
  )
}

export default App
