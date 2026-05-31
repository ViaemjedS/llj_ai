import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
      <span>{todo.text}</span>
      <div className="actions">
        <button onClick={() => onToggle(todo.id)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;