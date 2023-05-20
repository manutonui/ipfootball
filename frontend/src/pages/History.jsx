import { useState, useEffect } from "react"
import MatchTable from "../components/MatchTable";

const History = () => {
    const [prevmatches, setPrevmatches] = useState([])
    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`/matches/past/`);
            const json = await response.json();
            if (response.ok) setPrevmatches(json) // update state
        }
        fetchMatches()
    }, [])

    return (
        <div className="history container my-5">
            <MatchTable matches={prevmatches} title="Past Fixtures"/>
        </div>
    );
}
 
export default History;