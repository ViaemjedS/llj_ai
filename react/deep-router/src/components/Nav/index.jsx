import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
            <ul>
                <li><Link to="/about">About</Link></li>
            </ul>
            
        </nav>
    )
}
export default Nav
