import MatchTable from "../components/MatchTable";
import { useState, useEffect } from 'react';

const Homepage = () => {

    const today = new Date()
    const prev = new Date(today)
    prev.setDate(today.getDate()-1)

    const [matches, setMatches] = useState([])
    const [prevmatches, setPrevmatches] = useState([])
    
    useEffect(() => {
        

        const fetchMatches = async () => {
            const yesterday = prev.toISOString().split('T')[0]
        
            const response = await fetch(`/matches/date/today`)
            const json = await response.json()
            if ( response.ok ) setMatches(json)

            const response2 = await fetch(`/matches/date/${yesterday}`)
            const json2 = await response2.json()
            if ( response2.ok ) setPrevmatches(json2)
        }
        fetchMatches()
    }, [])

    return (
        <div className="homepage container my-5">
            <MatchTable matches={matches} title="Today" date={today}/>
            <MatchTable matches={prevmatches} title="Yersterday" date={prev} />
        </div>
    );
}
 
export default Homepage;
