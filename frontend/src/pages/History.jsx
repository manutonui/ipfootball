import { useState, useEffect } from "react"
import MatchTable from "../components/MatchTable";

const History = () => {
    const [prevmatches, setPrevmatches] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const fetchMatches = async () => {
            const d = date.toISOString().split('T')[0] // convert to iso then split
            const response = await fetch(`/matches/date/${d}`);
            const json = await response.json();
            if (response.ok) setPrevmatches(json) // update state
        }
        fetchMatches()
    }, [date])

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
                <button onClick={handlePrev} className="prev btn btn-dark">&laquo; Previous Date</button>
                { (date < new Date()) && (<button onClick={handleNxt} className="next btn btn-dark">Next Date &raquo;</button>) }
            </div><br />
            <MatchTable matches={prevmatches} title="Fixtures" date={date}/>
        </div>
    );
}
 
export default History;