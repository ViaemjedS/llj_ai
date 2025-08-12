import {
    useRef
} from 'react';
import {
    useUserStore
} from '@/store/user';
import {
    useNavigate,
} from 'react-router-dom';

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {login} = useUserStore();
    const handleLogin = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if (!username || !password) {
            alert("请输入用户名或密码");
            return;
        }
        login({username, password})
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }
    return (
        <h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id='username' 
                        ref={usernameRef}
                        placeholder='Please enter your username'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id='password' 
                        ref={passwordRef}
                        placeholder='Please enter your password'
                        required
                    />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </h1>
    )
}

export default Login;