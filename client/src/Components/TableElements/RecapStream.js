import { espnRecap, streamCheck, stream } from '../Utils/RecapStream';

function RecapStream ({ match, isBreakoutTitle }) {
    if ( isBreakoutTitle ) {
        return <td className={match.competition}></td>
    }
    return (
        <td className={match.competition}>
            {(match.score != null) 
            ? <i onClick={() => { espnRecap(match) }} className="bi bi-newspaper" style={{ fontSize: "1.5rem" }}></i> 
            : (streamCheck(match) 
            ? <i onClick={() => { stream(match) }} className="bi bi-tv" style={{ fontSize: "1.5rem" }}></i>
            : <></>) }
        </td>
    )
}

export default RecapStream