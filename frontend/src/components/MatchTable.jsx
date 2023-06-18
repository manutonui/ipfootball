import MatchDetails from "./MatchDetails";

const MatchTable = ({matches}) => {

    return (
        <div className="match-table">
            <table className="table">
                <thead>
                    <tr>
                        <th>Match</th>
                        <th>Tip</th>
                        <th>FT</th>
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
