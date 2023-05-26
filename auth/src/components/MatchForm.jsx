import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useMatches } from "../hooks/useMatches"

const MatchForm = ({match, title}) => {
    
    const {user} = useAuth()
    const { dispatch } = useMatches()

    const [home, setHome] = useState('')
    const [away, setAway] = useState('')
    const [tip, setTip] = useState('NONE')
    const [odds, setOdds] = useState('')
    const [result, setResult] = useState('')
    const [status, setStatus] = useState('NONE')
    const [date, setDate] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(()=>{
        if ( match ) {
            setHome(match.fixture.split(' - ')[0])
            setAway(match.fixture.split(' - ')[1])
            setTip(match.tip)
            setOdds(match.odds)
            setResult(match.result)
            setStatus(match.status)
            setDate(match.date.split('T')[0])
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
                body: JSON.stringify({home,away,tip,date,odds, result, status})
            })
    
            const json = await response.json()
            
            if (!response.ok) {
                setError(json.error)
            }

            if (response.ok) {
                setError(null);
                setSuccess('Match updated successfully!')
                setHome(''); setAway(''); setOdds(''); setTip('NONE'); setDate('');
                dispatch({type: 'UPDATE_MATCH', payload: json})
            }
        } else { // create new
            const response = await fetch('/matches/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({home,away,tip,date,odds})
            })
    
            const json = await response.json()
            
            if (!response.ok) setError(json.error)
            if (response.ok) {
                setError(null);
                setSuccess('Match posted successfully!')
                setHome(''); setAway(''); setOdds(''); setTip('NONE'); setDate('');
                dispatch({type: 'CREATE_MATCH', payload: json})
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

    return (
        <div>
            <form className='matchform' onSubmit={handleSubmit}>
                <h3 className='title'>{title}</h3>
                <div className="row">
                    <div className="col">
                        <label>Home<span className='required'>*</span></label>
                        <input required className="form-control" placeholder="Home" value={home} onChange={e => setHome(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Away<span className='required'>*</span></label>
                        <input required className="form-control" placeholder="Away" value={away} onChange={e => setAway(e.target.value)}/>
                    </div>
                </div><br/>

                <div className="row">
                    <div className="col">
                        <label>Tip<span className='required'>*</span></label>
                        <select required className="form-control" defaultValue={match ? match.tip : 'NONE'} onChange={e => setTip(e.target.value)}>
                            <option disabled value={'NONE'}>Tip</option>
                            <option value="home">Home Win</option>
                            <option value="draw">Draw</option>
                            <option value="away">Away Win</option>
                            <option value="dc1x">DC 1X</option>
                            <option value="dc12">DC 12</option>
                            <option value="dcx2">DC X2</option>
                            <option value="gg">GG</option>
                            <option value="ngg">No GG</option>
                            <option value="ov1.5">Over 1.5</option>
                            <option value="ov1.5">Over 1.5</option>
                            <option value="ov1.5">Over 1.5</option>
                            <option value="un1.5">Under 1.5</option>
                            <option value="ov2.5">Over 2.5</option>
                            <option value="un2.5">Under 2.5</option>
                            <option value="ov3.5">Over 3.5</option>
                            <option value="un3.5">Under 3.5</option>
                            <option value="ht1">HT 1</option>
                            <option value="htx">HT X</option>
                            <option value="ht2">HT 2</option>
                        </select>
                    </div>
                    <div className="col">
                        <label>Odds<span className='required'>*</span></label>
                        <input required type="number" step=".01" placeholder="Odds" className="form-control" value={odds} onChange={e => setOdds(e.target.value)}/>
                    </div>
                </div><br/>

                <div className="row">
                    <div className="col">
                        <label>Date<span className='required'>*</span></label>
                        <input required type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)}/>
                    </div>
                </div><br/>

                { match && (
                    <>
                        <div className="row">
                            <div className="col">
                                <label>Result</label>
                                <input placeholder="Result" className="form-control" value={result} onChange={e => setResult(e.target.value)}/>
                            </div>
                            <div className="col">
                                <label>Status</label>
                                <select className='form-control' defaultValue={match ? match.status : 'NONE'} onChange={e => setStatus(e.target.value)}>
                                    <option value="NONE">Unfinished</option>
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
                
            </form>
        </div>
    );
}
 
export default MatchForm;