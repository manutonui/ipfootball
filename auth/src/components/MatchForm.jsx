import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useMatches } from "../hooks/useMatches"
import { useLogout } from '../hooks/useLogout'
import FlashMessage from '../components/FlashMessage'

const MatchForm = ({match, title}) => {
    
    const {user} = useAuth()
    const { dispatch } = useMatches()
    const [flash, setFlash] = useState(null)
    const {logout} = useLogout()

    const [home, setHome] = useState('')
    const [away, setAway] = useState('')
    const [tip, setTip] = useState('none')
    const [odds, setOdds] = useState('')
    const [result, setResult] = useState('')
    const [status, setStatus] = useState('?')
    const [date, setDate] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [category, setCategory] = useState('none')

    useEffect(()=>{
        if ( match ) {
            setHome(match.fixture.split(' - ')[0])
            setAway(match.fixture.split(' - ')[1])
            setTip(match.tip)
            setOdds(match.odds)
            setResult(match.result)
            setStatus(match.status)
            setDate(match.date.split('T')[0])
            setCategory(match.category)
        }
    },[match])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) return

        if ( match ) { // update
            const response = await fetch(`/matches/update/${match._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({home,away,tip,date,odds, result, status, category})
            })
    
            const json = await response.json()

            if (response.ok) {
                setError(null);
                setSuccess('Match updated successfully!')
                setHome(''); setAway(''); setOdds(''); setTip('none'); setDate('');
                dispatch({type: 'UPDATE_MATCH', payload: json})
            } else {
                if (!response.ok) { if (json.fix === 'refresh') {
                    setFlash('Login expired, logging you out...')
                    setTimeout(() => {
                        logout()
                    }, 5000);
                } }
            }
        } else { // create new
            const response = await fetch('/matches/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({home,away,tip,date,odds, category})
            })
    
            const json = await response.json()
            if (response.ok) {
                setError(null);
                setSuccess('Match posted successfully!')
                setHome(''); setAway(''); setOdds(''); setTip('none'); setDate('');
                dispatch({type: 'CREATE_MATCH', payload: json})
            } else {
                if (!response.ok) { if (json.fix === 'refresh') {
                    setFlash('Login expired, logging you out...')
                    setTimeout(() => {
                        logout()
                    }, 5000);
                } }
            }
        }

    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!user) return
        
        const response = await fetch(`/matches/delete/${match._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if ( !response.ok ) setError(json.error)
        if (response.ok) {
        	dispatch({type: 'DELETE_MATCH', payload: json})
        }
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const handleResultChange = (e) => {
        setResult(e.target.value)
    }

    const handleTipChange = (e) => {
        setTip(e.target.value)
    }

    return (
        <div>
            <form className='matchform' onSubmit={handleSubmit}>
                <h3 className='title'>{title}</h3>
                <div className="row">
                    <div className="col">
                        <label>Home<span className='required'>*</span></label>
                        <input required className="form-control form-control-sm" placeholder="Home Team" value={home} onChange={e => setHome(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Away<span className='required'>*</span></label>
                        <input required className="form-control form-control-sm" placeholder="Away Team" value={away} onChange={e => setAway(e.target.value)}/>
                    </div>
                </div><br/>

                <div className="row">
                    <div className="col">
                        <label>Tip<span className='required'>*</span></label>
                        <select required className="form-control form-control-sm" onChange={handleTipChange} value={tip}>
                            <option disabled value="none">Tip</option>
                            <option value="home">Home Win</option>
                            <option value="draw">Draw</option>
                            <option value="away">Away Win</option>
                            <option value="dc1x">DC 1X</option>
                            <option value="dc12">DC 12</option>
                            <option value="dcx2">DC X2</option>
                            <option value="gg">GG</option>
                            <option value="ngg">No GG</option>
                            <option value="ov1.5">Over 1.5</option>
                            <option value="un1.5">Under 1.5</option>
                            <option value="ov2.5">Over 2.5</option>
                            <option value="un2.5">Under 2.5</option>
                            <option value="ov3.5">Over 3.5</option>
                            <option value="un3.5">Under 3.5</option>
                        </select>
                    </div>
                    <div className="col">
                        <label>Odds<span className='required'>*</span></label>
                        <input required type="number" step=".01" placeholder="Odds" className="form-control form-control-sm" value={odds} onChange={e => setOdds(e.target.value)}/>
                    </div>
                </div><br/>

                <div className="row">
                    <div className="col">
                        <label>Date<span className='required'>*</span></label>
                        <input required type="date" className="form-control form-control-sm" value={date} onChange={e => setDate(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Category<span className='required'>*</span></label>
                        <select className='form-control' onChange={handleCategoryChange} value={category}>
                            <option value="public">Public</option>
                            <option value="paid">VIP</option>
                        </select>
                    </div>
                </div><br/>

                { match && (
                    <>
                        <div className="row">
                            <div className="col">
                                <label>Result</label>
                                <input placeholder="Result" className="form-control" value={result} onChange={handleResultChange}/>
                            </div>
                            <div className="col">
                                <label>Status</label>
                                <select className='form-control' onChange={handleStatusChange} value={status}>
                                    <option disabled value="?">Result</option>
                                    <option value="won">Won</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                        </div><br/>
                    </>
                )}

                <input type="submit" value={match ? 'Update':'Create'} className="btn btn-success" />

                {match && (<button className='btn btn-danger del-btn' onClick={handleDelete}>Delete</button>)}

                <br/>

                {error && <div className="alert alert-danger my-2">{error}</div>}<br/>

                {success && <div className="alert alert-success my-2">{success}</div>}<br/>
                { flash && <FlashMessage msg={flash} /> }
            </form>
        </div>
    );
}
 
export default MatchForm;
