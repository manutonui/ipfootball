import { useState } from "react";
import MatchForm from './MatchForm'

const MatchDetails = ({match}) => {
    const [updateModal, setUpdatemodal] = useState(false)

    const toggleUpdateModal = () => {
        setUpdatemodal(!updateModal)
    }

    const handleStatus = (match) => {
        if (match.status === 'won') return <>&#9989;</>
        if (match.status === 'lost') return <>&#10060;</>
        else return <>&#9898;</>
    }

    return (
        <>
            <tr onClick={toggleUpdateModal}>
                {/* <td>{dateFormat(match.date, 'yyyy-mm-dd')}</td> */}
                <td>{match.fixture.split('-')[0]}<br/>{match.fixture.split('-')[1]}</td>
                <td><b className="tip">{match.tip}</b> @ {match.odds}</td>
                <td>{match.result}<span className="statusIcon">{handleStatus(match)}</span></td>
                <td>{match.author}</td>
            </tr>


            {updateModal ? (
                <span className="update-modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        {/* Display match form */}
                        <MatchForm match={match} title="Update Match"/>
                        <button className="btn-close" onClick={toggleUpdateModal}></button>
                    </div>
                </span>
            ):null}
            
        </>
    );
}
 
export default MatchDetails;