import { useState, useEffect } from "react"
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";
import ReactGA from 'react-ga';

const History = () => {
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        const fetchMatches = async () => {
            const d = date.toISOString().split('T')[0] // convert to iso then split
            const response = await fetch(`/matches/date/${d}`);
            const json = await response.json();
            if (response.ok) setMatches(json) // update state
        }
        fetchMatches()
    }, [date])

    const handleDate = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="history container my-5">
            <h3 className="page-title my-4">Past Matches</h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches" date={date}/>
        </div>
    );
}
 
export default History;