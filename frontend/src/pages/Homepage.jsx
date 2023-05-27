import { Link } from 'react-router-dom'
import MatchTable from "../components/MatchTable";
import dateFormat from 'dateformat'
import { useState, useEffect } from 'react';

const Homepage = () => {

    const [matches, setMatches] = useState([])
    const [prevmatches, setPrevmatches] = useState([])
    
    useEffect(() => {
        

        const fetchMatches = async () => {
		const yesterday = dateFormat(new Date().setDate(new Date().getDate()-1), 'yyyy-mm-dd')
        
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
            <MatchTable matches={matches} title="Today" />
            <MatchTable matches={prevmatches} title="Yersterday" />
        </div>
    );
}
 
export default Homepage;
