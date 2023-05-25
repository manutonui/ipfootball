const MatchDetails = ({match}) => {
    const handleStatus = (match) => {
        if (match.status === 'won') return <>&#9989;</>
        if (match.status === 'lost') return <>&#10060;</>
        else return null
    }
    
    return (
        <tr>
            {/* <td>{dateFormat(match.date, 'yyyy-mm-dd')}</td> */}
            <td>{match.fixture.split('-')[0]}<br/>{match.fixture.split('-')[1]}</td>
            <td><b className="tip">{match.tip}</b></td>
            <td><i className='odds badge rounded-pill text-bg-light'>@ {match.odds}</i></td>
            <td>{match.result}<span className="statusIcon">{handleStatus(match)}</span></td>
        </tr>
    );
}
 
export default MatchDetails;
