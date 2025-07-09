
import { 
    useEffect,    
    useState
 } from 'react'

export const useTodos = () => {
    // 数据流管理
    // 父组件持有管理数据 props 传递数据 子组件通过props 自定义函数
    // 通知父组件
    const [todos, setTodos] = useState(JSON.parse(
        localStorage.getItem('todos')
    ))
    useEffect(() => {
        // console.log("...");
        // 接受字符串,
        window.localStorage.setItem('todos', JSON.stringify(todos)); // 数组转字符串
    }, [todos])

    
    const addTodo = (text) => {
        // setTodo
        // 数据状态是对象的时候
        setTodos([
            ...todos,
            {
                id:Date.now(),
                text,
                isCompleted: false
            }
        ])
    }

    const onToggle = (id) => {
        // todos 数组找到id 为id，isComplete !isComplete
        // 响应式 返回一个全新的todos
        setTodos(todos.map(
            todo => todo.id === id
             ? {...todo, isCompleted:!todo.isCompleted}
            : todo
        ))

    }

    const onDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return {
        todos,
        setTodos,
        onToggle,
        onDelete,
        addTodo
    }
}

