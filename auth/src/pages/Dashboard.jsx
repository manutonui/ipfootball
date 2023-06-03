import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="dashboard container my-5">
            <div className='navigate'>
                <Link to="/new"><span>Add New</span></Link>
                <Link to="/free"><span>Free Tips</span></Link>
                <Link to="/paid"><span>VIP Tips</span></Link>
                <Link to="/stats"><span>Stats</span></Link>
            </div>
        </div>
    );
}
 
export default Dashboard;