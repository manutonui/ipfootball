const MatchDetails = ({match}) => {
    return (
        <tr>
            {/* <td>{dateFormat(match.date, 'yyyy-mm-dd')}</td> */}
            <td>{match.fixture.split('-')[0]}<br/>{match.fixture.split('-')[1]}</td>
            <td><b className="tip">{match.tip}</b></td>
            <td><i className='odds badge rounded-pill text-bg-light'>@ {match.odds}</i></td>
            <td>{match.result}</td>
        </tr>
    );
}
 
export default MatchDetails;
