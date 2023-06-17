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
            <button onClick={handlePrev} className="btn btn-sm btn-light">&laquo; Previous Day</button>
            { (date < new Date()) && (<button onClick={handleNext} className="btn btn-sm btn-light">Next Day &raquo;</button>) }
        </div>
    );
}
 
export default PickDate;