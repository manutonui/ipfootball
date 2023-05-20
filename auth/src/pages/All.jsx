import { useEffect } from "react";
import MatchTable from "../components/MatchTable";
import { useMatches } from "../hooks/useMatches"
import { useAuth } from '../hooks/useAuth'
import { useLogout } from '../hooks/useLogout'

const All = () => {
	const {user} = useAuth()
	const { logout } = useLogout()
    const { matches, dispatch } = useMatches()

    useEffect(() => {
        const fetchMatches = async function() {
            const response = await fetch(`/matches/all`, {
                headers: {'Authorization':`Bearer ${user.token}`}
            })
            const json = await response.json()
            if (!response.ok) {
                if (json.error) {
                    logout()
                    return
                }
            }
            dispatch({type: 'SET_MATCHES', payload: json})
        }
        fetchMatches()
    }, [dispatch])

    return (
        <div className="container my-5">
            <MatchTable matches={matches} title="All Matches" />
        </div>
    );
}
 
export default All;
