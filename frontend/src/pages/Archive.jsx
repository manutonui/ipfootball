import { useState, useEffect } from "react"
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";
import { Helmet } from 'react-helmet';
import TableTitle from '../components/TableTitle'

const Archive = () => {
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const fetchMatches = async () => {
            const d = date.toISOString().split('T')[0] // convert to iso then split
            const response = await fetch(`/matches/prev/${d}`);
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
            <TableTitle title="Past Tips" date={date}/>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches"/>
        </div>
    );
}
 
export default Archive;