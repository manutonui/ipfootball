import { useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const Paid = () => {
    const {user} = useAuthContext()
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())
    
    const handleDate = (newDate) => {
        setDate(newDate);
    };

    useEffect(() => {
        if (user) {
            ReactGA.pageview(window.location.pathname);
            const fetchMatches = async () => {
                const d = date.toISOString().split('T')[0]
                const response = await fetch(`/matches/vip/${d}`, {
                    headers: {
                        'Authorization':`Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if ( response.ok ) setMatches(json)
            }
            fetchMatches()
        }
    // eslint-disable-next-line
    }, [date])

    return (
        <div className="container my-5">
            <Helmet>
                <title>IP Football VIP</title>
                <meta name="description" content="Get our high-odds expert tips in our premium subscription service for as low as $1 per week. Our exclusive betting tips will give you a winning edge and take your betting to the next level" />
            </Helmet>
            <h3 className="page-title my-4">Paid Matches</h3>
            <PickDate date={date} handleDate={handleDate} />
            <MatchTable matches={matches} title="Matches" date={date}/>
        </div>
    );
}
 
export default Paid;