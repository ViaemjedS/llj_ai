import {
    useState // 私有状态
} from 'react';
const TodoForm = ({onAddTodo}) => {
    // 数据
    // props 参数数据
    // state 私有的数据
    // 单向数据流
    const [text, setText] = useState(''); // 私有状态 函数组件 不能使用this 关键字
    const handleSubmit = (e) => {
        e.preventDefault();
        let result = text.trim();
        if (!result) return;
        onAddTodo(result);
        setText(''); // 数据状态和界面状态一致，要敏感
    }
    
    // JSX 一定得有唯一的最外层元素 树状
    return (
        <div>
            <h1 className='header'>TodoList</h1>
            <form>
                <input
                    id='todo-input'
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='Todo'
                    required
                    // 维护数据驱动值和数据状态的绑定 
                />
                <button id='todo-button' onClick={handleSubmit}>提交</button>
            </form>
        </div>
        
    )
}

export default TodoForm