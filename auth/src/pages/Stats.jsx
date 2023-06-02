import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import { useAuth } from '../hooks/useAuth'

const Stats = () => {
    const {user} = useAuth()
    const [users, setUsers] = useState([])
    useEffect(()=>{
        if (user) {
            const fetchUsers = async () => {
                const response = await fetch('/users/all', {
                    headers: {
                        'Authorization':`Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) setUsers(json)
            }
            fetchUsers()
        }
    },[user])
    return (
        <div className="container my-5">
            <h3 className="title">Stats</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">Type</th>
                        <th scope="col">Last Login Time</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user) => (<UserDetails user={user}/>)) }
                </tbody>
            </table>
        </div>
    );
}
 
export default Stats;