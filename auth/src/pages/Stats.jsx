import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import { useAuth } from '../hooks/useAuth'
import { useLogout } from '../hooks/useLogout'
import FlashMessage from '../components/FlashMessage'

const Stats = () => {
    const {user} = useAuth()
    const [users, setUsers] = useState([])
    const [flash, setFlash] = useState(null)
    const {logout} = useLogout()

    useEffect(()=>{
        if (user) {
            const fetchUsers = async () => {
                const response = await fetch(`/users/all`, {
                    headers: {
                        'Authorization':`Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) setUsers(json)
                else {
                    if (!response.ok) { if (json.fix === 'refresh') {
                        setFlash('Login expired, logging you out...')
                        setTimeout(() => {
                            logout()
                        }, 5000);
                    } }
                }
            }
            fetchUsers()
        }
    // eslint-disable-next-line
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
                    { users.map((user) => (<UserDetails user={user} key={user._id}/>)) }
                </tbody>
            </table>
            { flash && <FlashMessage msg={flash} /> }
        </div>
    );
}
 
export default Stats;