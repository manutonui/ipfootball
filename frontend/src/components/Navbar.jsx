import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><h3>ipfootball</h3></Link>
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/history">History</Link>
                    </div>
                </div>
            </nav>
            
        </div>
    );
}
 
export default Navbar;
