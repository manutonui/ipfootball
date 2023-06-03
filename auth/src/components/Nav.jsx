import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLogout } from '../hooks/useLogout'

const Nav = () => {
    const {user} = useAuth()
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-body-tertiary py-2" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">IP<i><small>admin</small></i></Link>
                    { user && (
                        <>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav me-auto nav-pills">
                                    <Link className="nav-link" to="/new">New</Link>
                                    <Link className="nav-link" to="/free">Free</Link>
                                    <Link className="nav-link" to="/paid">VIP</Link>
                                    <Link className="nav-link" to="/stats">Stats</Link>
                                </ul>
                                <li className="nav-link"><button className='btn btn-sm btn-danger' onClick={handleLogout}>Logout</button></li>
                            </div>
                        </>
                    )}
                    
                </div>
            </nav>
        </div>
    );
}
 
export default Nav;