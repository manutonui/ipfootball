import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { Helmet } from 'react-helmet';
import FlashMessage from '../components/FlashMessage'
import { useLogout } from '../hooks/useLogout'

const Subscribe = () => {
    const {user, dispatch} = useAuthContext()
    const [subd, setSubd] = useState(false)
    const [flash, setFlash] = useState(null)
    const {logout} = useLogout()

    useEffect(()=>{
        if (user) {
            if ( user.type === 'paid' ) {
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
        if ( response.ok ) { dispatch({type: 'TOGGLE_SUB', payload: json}) }
        else {
            if (!response.ok) { if (json.fix === 'refresh') {
                setFlash('Login expired, logging you out...')
                setTimeout(() => {
                    logout()
                }, 3000);
            } }
        }
    }

    return (
        <div className="subscribe container my-5">
            <Helmet>
                <title>Subscribe - IP Football</title>
                <meta name="description" content="Create a free account and subscribe to our expert tips in our premium service for as low as $1 per week." />
            </Helmet>
            { !subd && (<button className="btn btn-success" onClick={handleSubscribe}>Subscribe</button>) }
            { subd && (<button className="btn btn-danger" onClick={handleSubscribe}>Unsubscribe</button>) }

            { flash && <FlashMessage msg={flash} /> }
        </div>
    );
}
 
export default Subscribe;