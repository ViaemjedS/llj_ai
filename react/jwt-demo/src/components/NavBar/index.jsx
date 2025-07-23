import {Link} from 'react-router-dom'
import { useUserStore } from '@/store/user';
const NavBar = () => {
    const {isLogin, user, logout} = useUserStore()
    console.log(isLogin, user, '//////')
    return (
        <nav style={{padding: 10, borderBottom: '1px solid #ccc'}}>
            <Link to='/'><h1>Home</h1></Link>
            <Link to='/pay'><h1>Pay</h1></Link>
            {
                isLogin ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link to='/login'><h1>Login</h1></Link>
                )
            }
        </nav>
    )
}

export default NavBar;