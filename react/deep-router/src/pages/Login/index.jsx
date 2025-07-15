import { useState } from "react";

import {
    useNavigate, // Naviagte 组件 js 跳转
    useLocation
} from 'react-router-dom'
const Login = () => {
    const location = useLocation();
    // console.log(location.state.from); // 跳转前的路径
    const navigate = useNavigate(); // navigate 能力
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault(); 
        // console.log('用户名:', username);
        // console.log('密码:', password);
        if (username === 'admin' && password === '123456') {
            localStorage.setItem('isLogin', 'true');
            navigate(location?.state?.from || '/');
            // window.location.href = '/';
        } else {
            alert('用户名或密码错误');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>登入页面</h1>
                <input 
                    type="text" 
                    placeholder="请输入用户名"
                    value={username}
                    required
                    onChange={(event) => setUsername(event.target.value)}
                    />
                <input 
                    type="password" 
                    placeholder="请输入密码"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                <button type="submit">登录</button>
            </form>
        </>
    )
}

export default Login