import { compClick } from "../utils";

function Competition({ match }) {
    return (
        <td className={match.competition} onClick={() => compClick(match)}>
            {(match.competition === "BLANK") ?
                (<>

                </>) : (
                    <>
                        <i className="bi bi-card-list" style={{ fontSize: "1rem" }}>  </i>{match.competition}
                    </>
                )}
        </td>);

}

export default Competition;