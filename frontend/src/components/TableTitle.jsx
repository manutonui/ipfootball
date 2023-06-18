const TableTitle = ({title, date}) => {

    const theDate = () => {
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
        <div>
            <h2 className="title my-4">{title} - <span className="date">{theDate()}</span></h2>
        </div>
    );
}
 
export default TableTitle;