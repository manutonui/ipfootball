import MatchDetails from "./MatchDetails";

const MatchTable = ({matches, date}) => {

    const handleDate = () => {
        var currentDate = new Date();
        var previousDate = new Date();
        previousDate.setDate(currentDate.getDate() - 1);
        var nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + 1);
        if (date.toDateString() === previousDate.toDateString()) return "Yesterday"
        else if (date.toDateString() === nextDate.toDateString()) return "Tomorrow"
        else if (date.toDateString() === currentDate.toDateString()) return "Today"
        else return date.toDateString().substring(0,date.toDateString().lastIndexOf(" "))
    }

    return (
        <div className="match-table">
            <h4 className="title">{handleDate()}</h4>
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
