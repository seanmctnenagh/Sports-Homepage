import { liveCheck, ncaaRanks, titleClick } from "../utils";

function Title({ match, team1, team2, vs, redirect = () => {}, breakout }) {
    if (breakout) {
        return (
            <td className={match.competition} onClick={() => titleClick(match, true)}>
                {team1} {vs} {team2}
            </td>
        )
    }
    return (
        <td className={match.competition} onClick={() => { if (titleClick(match, false)) { redirect(match.sport); } }}>
            {(liveCheck(match)) ? <i className="bi bi-record-fill live"></i> : null}
            {team1}{ncaaRanks(team1)} {vs} {team2}{ncaaRanks(team2)}
        </td>
    )
}

export default Title;