import { useEffect, useState } from "react";
import MatchTable from "../components/MatchTable";
import { useMatches } from "../hooks/useMatches"

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
    }, [dispatch, date])

    const handlePrev = () => {
        const prev = new Date(date)
        prev.setDate(date.getDate()-1)
        setDate(prev)
    }

    const handleNxt = () => {
        const nxt = new Date(date)
        nxt.setDate(date.getDate()+1)
        setDate(nxt)
    }

    return (
        <div className="history container my-5">
            <div className="pickDate">
                <button onClick={handlePrev} className="prev btn btn-sm btn-dark">&laquo; Previous Date</button>
                { (date < new Date()) && (<button onClick={handleNxt} className="next btn btn-sm btn-dark">Next Date &raquo;</button>) }
            </div><br />
            <MatchTable matches={matches} title="Matches" date={date} />
        </div>
    );
}
 
export default All;
