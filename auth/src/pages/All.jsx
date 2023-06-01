import { useEffect, useState } from "react";
import MatchTable from "../components/MatchTable";
import { useMatches } from "../hooks/useMatches"
import PickDate from "../components/PickDate";

const All = () => {
    const { matches, dispatch } = useMatches()
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const fetchMatches = async function() {
            const d = date.toISOString().split('T')[0]
            const response = await fetch(`/matches/date/${d}`)
            const json = await response.json()
            if (response.ok) dispatch({type: 'SET_MATCHES', payload: json})
        }
        fetchMatches()
    }, [dispatch,date])

    const handleDate = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="history container my-5">
            <h3 className="title">Matches <span className="date">{date.toDateString()}</span></h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches" date={date} />
        </div>
    );
}
 
export default All;
