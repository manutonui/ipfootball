import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="dashboard container my-5">
            <div className='navigate'>
                <Link className="" to="/new"><span>Add New</span></Link>
                <Link className="" to="/all"><span>View All</span></Link>
                <Link className="" to="/stats"><span>Stats</span></Link>
            </div>
        </div>
    );
}
 
export default Dashboard;