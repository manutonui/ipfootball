import MatchDetails from "./MatchDetails";

const MatchTable = ({matches, title, date}) => {

    return (
        <div className="match-table">
            <h4 className="title">{title} <span className="date">{date.toDateString().substring(0,date.toDateString().lastIndexOf(" "))}</span></h4>
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
