import { useState, useEffect } from "react"
import { useAuth } from '../hooks/useAuth'
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";
import { useLogout } from '../hooks/useLogout'
import FlashMessage from '../components/FlashMessage'

const Paid = () => {
    const {user} = useAuth()
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())
    const [flash, setFlash] = useState(null)
    const {logout} = useLogout()
    
    const handleDate = (newDate) => {
        setDate(newDate);
    };

    useEffect(() => {
        if (user) {
            const fetchMatches = async () => {
                const d = date.toISOString().split('T')[0]
                const response = await fetch(`/matches/vip/${d}`, {
                    headers: {
                        'Authorization':`Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if ( response.ok ) setMatches(json)
                else {
                    if (!response.ok) { if (json.fix === 'refresh') {
                        setFlash('Login expired, logging you out...')
                        setTimeout(() => {
                            logout()
                        }, 5000);
                    } }
                }
            }
            fetchMatches()
        }
    // eslint-disable-next-line
    }, [date])

    return (
        <div className="paid container my-5">
            <h3 className="title">Paid Matches <span className="date">{date.toDateString()}</span></h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches" date={date}/>
            { flash && <FlashMessage msg={flash} /> }
        </div>
    );
}
 
export default Paid;