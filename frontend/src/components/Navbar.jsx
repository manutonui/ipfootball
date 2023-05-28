import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const {user} = useAuthContext()
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="container">
                    <Link className="navbar-brand me-3" to="/"><h3>ipfootball</h3></Link>
                    <ul className="navbar-nav ms-auto">
                        <Link className="nav-link text-info" to="/history"><b>View History</b></Link>
                    </ul>
                    <ul className='navbar-nav'>
                        { !user && (
                            <li className="nav-item ms-3"><Link className="nav-link" to="/login"><button className='btn btn-success btn-sm'>Login</button></Link></li>
                        )}
                        { user && (
                            <li><button className='btn btn-sm btn-danger ms-3' onClick={handleLogout}>Logout</button></li>
                        )}
                    </ul>
                </div>
            </nav>
            
        </div>
    );
}
 
export default Navbar;
