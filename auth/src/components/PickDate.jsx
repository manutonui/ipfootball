const PickDate = ({date, handleDate}) => {
    const maxDate = new Date().setDate(new Date().getDate() + 7)
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
            { (date < maxDate) && (<button onClick={handleNext} className="next btn btn-sm btn-secondary">Next Date &raquo;</button>) }
        </div>
    );
}
 
export default PickDate;