import MatchTable from "../components/MatchTable";
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const Homepage = () => {

    const today = new Date()
    const moro = new Date(today)
    moro.setDate(today.getDate()+1)

    const [matches, setMatches] = useState([])
    const [upcoming, setUpcoming] = useState([])
    
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        const fetchMatches = async () => {
            const tomorrow = moro.toISOString().split('T')[0]
        
            const response = await fetch(`/matches/date/today`)
            const json = await response.json()
            if ( response.ok ) setMatches(json)

            const response2 = await fetch(`/matches/date/${tomorrow}`)
            const json2 = await response2.json()
            if ( response2.ok ) setUpcoming(json2)
        }
        fetchMatches()
    }, [])

    return (
        <div className="homepage container my-5">
            <Helmet>
                <title>IP Football - Recent betting tips</title>
                <meta name="description" content="Free accurate football betting tips to increase your chances of winning. We analyze matches, form, and statistics to provide top-notch predictions every day. Join us and make informed betting decisions." />
            </Helmet>
            <h3 className="page-title my-4">Recent Tips</h3>
            <MatchTable matches={matches} title="Today" date={today}/>
            <MatchTable matches={upcoming} title="Tomorrow" date={moro} />
        </div>
    );
}
 
export default Homepage;
