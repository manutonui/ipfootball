import { useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import MatchTable from "../components/MatchTable";
import PickDate from "../components/PickDate";
import FlashMessage from '../components/FlashMessage'
import { Helmet } from 'react-helmet';
import { useLogout } from '../hooks/useLogout'

const Paid = () => {
    const {user} = useAuthContext()
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(new Date())
    const [flash, setFlash] = useState(null)
    const {logout} = useLogout()

    const handleDate = (newDate) => {
        setDate(newDate);
    };

    const fetchMatches = async () => {
        const d = date.toISOString().split('T')[0]
        const response = await fetch(`/matches/vip/${d}`, {
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if ( response.ok ) { setMatches(json) }
        else {
            if (!response.ok) { if (json.fix === 'refresh') {
                setFlash('Login expired, logging you out...')
                setTimeout(() => {
                    logout()
                }, 3000);
            } }
        }
    }

    useEffect(() => {
        if (user) {
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
            { flash && <FlashMessage msg={flash} /> }
        </div>
    );
}
 
export default Paid;