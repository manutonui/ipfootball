import MatchDetails from "./MatchDetails";

const MatchTable = ({matches, title, date}) => {

    return (
        <div className="match-table my-5">
            <h4 className="title">{title} - <small>{date.toISOString().split('T')[0]}</small></h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fixture</th>
                        <th>Tip</th>
                        <th>Odds</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.length ? matches.map( (match) => (<MatchDetails match={match} key={match._id}/>) ) : <tr className="nomatchesinfo">No matches available</tr>}
                </tbody>
            </table>
            
        </div>
    );
}
 
export default MatchTable;
