const PickDate = ({date, handleDate}) => {
    const handlePrev = () => {
        const prev = new Date(date)
        prev.setDate(date.getDate()-1)
        handleDate(prev)
    }

    const handleNext = () => {
        const next = new Date(date)
        next.setDate(date.getDate()+1)
        handleDate(next)
    }

    return (
        <div className="pickDate">
            <button onClick={handlePrev} className="prev btn btn-sm btn-secondary">&laquo; Previous Date</button>
            { (date < new Date()) && (<button onClick={handleNext} className="next btn btn-sm btn-secondary">Next Date &raquo;</button>) }
        </div>
    );
}
 
export default PickDate;