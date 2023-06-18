import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { Helmet } from 'react-helmet';
import FlashMessage from '../components/FlashMessage'
// import { useLogout } from '../hooks/useLogout'

const Subscribe = () => {
    const {user, dispatch} = useAuthContext()
    const [subd, setSubd] = useState(null)
    const [flash, setFlash] = useState(null)
    // const {logout} = useLogout()
    const [phone, setPhone] = useState('254')
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState(null)// can be checked instead of starting afresh
    const [alert, setAlert] = useState('warning')

    useEffect(()=>{
        const timer = setTimeout(() => setFlash(null), 8000) // Hide after 8 second

        if (user) {
            if ( user.duedate > new Date().toISOString() ) setSubd(true)
            else setSubd(false)
        }

        return () => clearTimeout(timer);
    }, [user, flash, subd, loading, code])

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await fetch('/users/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify({phone})
        })
        const json = await response.json()
        
        if (response.ok) { // request sent
            setLoading(false)
            setFlash("Request sent. Check phone then confirm to continue")
            setAlert('success')
            setCode(json.tx)
        } else {
            setLoading(false)
            setFlash(json.error)
            setAlert('danger')
            // logout()
        }
        // console.log("JSON: ", json)
    }

    const confirmCode = async () => {
        setLoading(true)
        const response = await fetch('/users/querystk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify({code})
        })
        const json = await response.json()
        if (!response.ok ) { // query not sent
            setFlash(json.error)
        }
        if (response.ok) { // query sent successfully
            if (json.code !== '0') {
                // setCode(null)
                setFlash(json.msg)
                setAlert('danger')
            } else if (json.code === '0') {
                dispatch({type: 'TOGGLE_SUB', payload: json.user})
                setAlert('success')
                setFlash(json.msg)
            }
        }
        setLoading(false)
    }

    const handleNo = async (e) => {
        setPhone(e.target.value)
    }

    return (
        <div className="subscribe container my-5">
            <Helmet>
                <title>Subscribe - IP Football</title>
                <meta name="description" content="Create a free account and subscribe to our expert tips in our premium service for as low as $1 per week." />
            </Helmet>

            <h3 className="page-title">Premium Section</h3>
            <div className="subscription-details">
                <p>
                    <b>{(user.identity).toUpperCase()}</b><br/>
                    Subscription: <b className={subd ? 'text-success':'text-primary'}>{ subd ? 'Premium':'None' }</b><br/>
                    { subd && (<>Due on: {new Date(user.duedate).toDateString()}</>) }
                    { !subd && (<>Monthly at 70/- (First Month Only)</>)}
                </p>
            </div>
            
            { !subd && <form onSubmit={handleSubscribe} className="subscriptionForm">
                <h4>Amount Ksh 70/-</h4><br/>
                <label>Mpesa no.</label>
                <input className="form-control" value={phone} onChange={handleNo} required/><br/>
                { !code && (<input type="submit" value="Proceed" className="btn btn-success me-2" disabled={loading}/>)}
                { code && (<input className="btn btn-primary me-2" onClick={confirmCode} type="button" value="Confirm"/>)}
                { loading && (<div className="loader"></div>) }
                { flash && <FlashMessage msg={flash} alert={alert} /> }
            </form> }

        </div>
    );
}
 
export default Subscribe;