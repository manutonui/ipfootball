import MatchForm from '../components/MatchForm'

const NewMatch = () => {

    return (
        <div className="container my-5">
            <MatchForm match={null} title={"New Match"}/>
        </div>
    );
}
 
export default NewMatch;