import { highlights } from "../utils";
import Button from 'react-bootstrap/Button';

function Highlights ({ match }) {
    return (
        <td className={match.competition}>
            {
                (match.highlights)
                    ?
                    <Button variant="warning" onClick={() => { highlights(match) }}>Highlights</Button>
                    :
                    null
            }
        </td>
    )
}

export default Highlights;