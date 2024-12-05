import { highlights } from "../Utils/Highlights";
// import Button from 'react-bootstrap/Button';

function Highlights ({ match, timeframe }) {
    if ( timeframe === "Future" ) { return null; }
    return (
        <td className={match.sport.replaceAll(" ", "")}>
            {
                (match.highlights)
                ?
                <i class="bi bi-youtube" onClick={() => { highlights(match) }} style={{ fontSize: "1.75rem" }}></i>
                // <Button variant="warning" onClick={() => { highlights(match) }}>Highlights</Button>
                :
                <></>
            }
        </td>
    )
}

export default Highlights;