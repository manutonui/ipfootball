import MatchDetails from "./MatchDetails";

const MatchTable = ({matches, title, date}) => {

    return (
        <div className="match-table">
            <table className="table">
                <thead>
                    <tr>
                        <th>Match</th>
                        <th>Tip</th>
                        <th>FT</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map( (match) => (
                        match && <MatchDetails match={match} key={match._id}/>
                    ) )}
                </tbody>
            </table>
        </div>
    );
}
 
export default MatchTable;