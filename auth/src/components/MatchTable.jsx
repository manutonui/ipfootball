import MatchDetails from "./MatchDetails";

const MatchTable = ({matches, title}) => {

    return (
        <div>
            <h4 className="title">{title}</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fixture</th>
                        <th>Tip (FT)</th>
                        <th>Odds</th>
                        <th>Result</th>
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