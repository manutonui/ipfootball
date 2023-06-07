import { useState, useEffect } from "react"
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";
import { Helmet } from 'react-helmet';

const History = () => {
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
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
            <Helmet>
                <title>IP Football History - Previous tips</title>
                <meta name="description" content="View our archive of previous betting tips. We analyze matches to provide top-notch predictions every day." />
            </Helmet>
            <h3 className="page-title my-4">Past Matches</h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches" date={date}/>
        </div>
    );
}
 
export default History;