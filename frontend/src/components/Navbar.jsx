import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><h1>ipfootball</h1></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <Link className="nav-link" to="/history">History</Link>
                            {/* 
                                <li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</span>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action 1</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Action 2</a>
                                    </div>
                                </li>
                            */}
                        </ul>
                        <span className="auth-links ms-auto">
                            { user && (
                                <div>
                                    <li className="nav-item text-warning me-3">{user.identity}</li>
                                    <li className="nav-item my-2"><button className='btn-danger btn btn-sm' onClick={handleLogout}>Logout</button></li>
                                </div>
                            )}

                            { !user && (
                                <div className='my-2'>
                                    <Link to="/login" className='btn btn-sm btn-outline-light ms-lg-3 me-sm-3'>Login</Link>
                                    <Link to="/signup" className='btn btn-sm btn-success ms-lg-3 me-sm-3'>Signup</Link>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
            </nav>
            
        </div>
    );
}
 
export default Navbar;
