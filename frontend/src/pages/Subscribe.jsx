import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import ReactGA from 'react-ga';

const Subscribe = () => {
    const {user, dispatch} = useAuthContext()
    const [subd, setSubd] = useState(false)

    useEffect(()=>{
        if (user) {
            ReactGA.pageview(window.location.pathname);
            if ( user.type == 'paid' ) {
                setSubd(true)
            } else {
                setSubd(false)
            }
        }
    }, [user])

    const handleSubscribe = async () => {
        const response = await fetch('/users/subscribe', {
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log("Context: ", json)
        if ( response.ok ) dispatch({type: 'TOGGLE_SUB', payload: json})
    }

    return (
        <div className="subscribe container my-5">
            { !subd && (<button className="btn btn-success" onClick={handleSubscribe}>Subscribe</button>) }
            { subd && (<button className="btn btn-danger" onClick={handleSubscribe}>Unsubscribe</button>) }
        </div>
    );
}
 
export default Subscribe;