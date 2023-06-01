import MatchTable from "../components/MatchTable";
import { useState, useEffect } from 'react';

const Homepage = () => {

    const today = new Date()
    const moro = new Date(today)
    moro.setDate(today.getDate()+1)

    const [matches, setMatches] = useState([])
    const [upcoming, setUpcoming] = useState([])
    
    useEffect(() => {
        

        const fetchMatches = async () => {
            const tomorrow = moro.toISOString().split('T')[0]
        
            const response = await fetch(`/matches/date/today`)
            const json = await response.json()
            if ( response.ok ) setMatches(json)

            const response2 = await fetch(`/matches/date/${tomorrow}`)
            const json2 = await response2.json()
            if ( response2.ok ) setUpcoming(json2)
        }
        fetchMatches()
    }, [])

    return (
        <div className="homepage container my-5">
            <h3 className="page-title my-4">Recent Tips</h3>
            <MatchTable matches={matches} title="Today" date={today}/>
            <MatchTable matches={upcoming} title="Tomorrow" date={moro} />
        </div>
    );
}
 
export default Homepage;
