import MatchTable from "../components/MatchTable";
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PickDate from "../components/PickDate";

const Homepage = () => {
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())
    
    useEffect(() => {
        const fetchMatches = async () => {
            const d = date.toISOString().split('T')[0]
            const response = await fetch(`/matches/date/${d}`)
            const json = await response.json()
            if ( response.ok ) setMatches(json)
        }
        fetchMatches()
        // eslint-disable-next-line
    }, [])

    const handleDate = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="homepage container my-5">
            <Helmet>
                <title>IP Football - Free Tips</title>
                <meta name="description" content="Free accurate football betting tips to increase your chances of winning. Expert analysis on matches, form, and statistics to provide top-notch predictions every day. Join us and make informed betting decisions." />
            </Helmet>
            <h3 className="page-title my-4">Free Tips</h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} date={date}/>
        </div>
    );
}
 
export default Homepage;
