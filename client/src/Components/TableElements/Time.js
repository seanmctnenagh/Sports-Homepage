import { tv } from '../utils.js';

function Time({ match, date, redirect, breakout=false }) {
    if (breakout) {
        return (
            <td className={match.competition} onClick={() => tv(match, true)}>
                {(match.competition === "BLANK") ?
                    null : (
                        <>
                            {("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}
                        </>
                    )}
            </td>
        )
    }
    return (
        <td className={match.competition} onClick={() => { if (tv(match, false)) { redirect(match.sport); } }}>
            {(match.competition === "BLANK") ?
                null : (
                    <>
                        {("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}
                    </>
                )}
        </td>
    )
}

export default Time;