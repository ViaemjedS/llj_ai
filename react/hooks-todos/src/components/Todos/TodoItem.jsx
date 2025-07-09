const TodoItem = (props) => {
    const {
        id,
        text,
        isCompleted,
        
    } = props.todo;
    const { 
        onToggle,
        onDelete
     } = props
    return (
        <div id="todo-item">
            <div className="todo-content">
                <input 
                    type="checkbox" 
                    checked={isCompleted} 
                    onChange={onToggle} // 确保正确调用onToggle
                />
                <span className={isCompleted ? 'completed' : ''}>{text}</span>
                <button onClick={onDelete}>Delete</button>
            </div>
            <div className="underline"></div>
        </div>
    )
}

export default TodoItem