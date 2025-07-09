import {
    // 响应式状态hooks
    useState, // react 函数式编程 好用的以use 开头的函数
    useEffect
} from "react"
import TodoForm  from "./TodoForm"
import TodoList from "./TodoList"
import {useTodos} from '@/hooks/useTodos'

const Todos = () => {
    const {
        todos, // 数据
        addTodo, // 方法
        onToggle, // 方法
        onDelete // 方法
    } = useTodos(); // 自定义hooks 函数式编程 函数组件 不能使用this 关键字
    return (
        <div className="app">
            {/* Todos */}
            {/* 自定义事件 */}
            <TodoForm onAddTodo={addTodo}/>
            <TodoList 
                todos={todos}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        </div>
    )
}

export default Todos