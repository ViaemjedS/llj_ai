import {
    useTodosStore,
} from '@/store/todos'

import {
    useState,
} from 'react'
const TodoList = () => {
    const {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
    } = useTodosStore()

    const [newTodoText, setNewTodoText] = useState('');

    // 处理添加待办的函数
    const handleAddTodo = () => {
      if (newTodoText.trim()) {
        addTodo(newTodoText);
        setNewTodoText('');
      }
    };
    return (
        <div className="todo-list">
      <h2>Todo List</h2>
      
      {/* 添加新待办的输入框和按钮 */}
      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      
      {/* 待办列表 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
      
      {/* 显示剩余未完成的待办数量 */}
      <div className="todo-count">
        <span>剩余 {todos.filter(todo => !todo.completed).length} 项未完成</span>
      </div>
    </div>
    )
}
export default TodoList