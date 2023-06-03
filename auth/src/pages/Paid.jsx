import { useState, useEffect } from "react"
import { useAuth } from '../hooks/useAuth'
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";

const Paid = () => {
    const {user} = useAuth()
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())
    
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
            }
            fetchMatches()
        }
    // eslint-disable-next-line
    }, [date])

    return (
        <div className="paid container my-5">
            <h3 className="page-title my-4">Paid Matches</h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches" date={date}/>
        </div>
    );
}
 
export default Paid;