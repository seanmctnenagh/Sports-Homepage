import { highlights } from "../Utils/Highlights";
// import Button from 'react-bootstrap/Button';

function Highlights ({ match }) {
    return (
        <td className={match.competition}>
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