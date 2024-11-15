import { tv } from "../Utils/DateTime";

function Time({ match, isBreakoutPage }) {
    let redirect = (page) => {match.redirect(page)};
    let date = new Date(match.date);
    if (isBreakoutPage) {
        return (
            <td className={match.competition} onClick={() => tv(match, isBreakoutPage)}>
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
        <td className={match.competition} onClick={() => { if (tv(match, isBreakoutPage)) { redirect(match.sport); } }}>
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