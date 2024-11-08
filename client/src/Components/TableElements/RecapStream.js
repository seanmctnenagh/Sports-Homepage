import { espnRecap, liveCheck, stream } from "../utils"

function RecapStream ({ match }) {
    return (
        <td className={match.competition}>
            { (match.score != null) 
            ? <i onClick={() => { espnRecap(match) }} class="bi bi-newspaper" style={{ fontSize: "1.5rem" }}></i> 
            : ((liveCheck(match) && ["NHL", "NBA", "NFL"].includes(match.competition)) 
                ? <i onClick={() => { stream(match) }} class="bi bi-tv" style={{ fontSize: "1.5rem" }}></i>
                : null)}
        </td>
    )
}

export default RecapStream