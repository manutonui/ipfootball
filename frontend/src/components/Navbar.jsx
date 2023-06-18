import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import $ from 'jquery'
import { useEffect } from 'react'

const Navbar = () => {
    const {user} = useAuthContext()
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        $('.navbar a').on('click', () => $('.navbar-toggler').click());
    },[])

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark">
                <div className="container">
                    <Link className="navbar-brand me-3" to="/"><h3>ipfootball</h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" ><span className="navbar-toggler-icon"></span></button>

                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto">
                            { user && (<Link className="nav-link" to="/subscribe">Subscription</Link>)}
                            { user && new Date(user.duedate ) > new Date() && (<Link className="nav-link" to="/paid">VIP</Link>)}
                            <Link className="nav-link" to="/archive">Archives</Link>
                            
                        </ul>
                        <ul className='navbar-nav'>
                            { !user && (
                                <>
                                    <li className="nav-item me-1"><Link className="nav-link" to="/login"><button className='btn btn-success btn-sm'>Login</button></Link></li>
                                    <li className="nav-item me-1"><Link className="nav-link" to="/signup"><button className='btn btn-primary btn-sm'>Signup</button></Link></li>
                                </>
                            )} 
                            { user && (<li><button className='btn btn-sm btn-danger me-3' onClick={handleLogout}>Logout</button></li>)}
                        </ul>
                    </div>
                </div>
            </nav>
            
        </div>
    );
}
 
export default Navbar;
