import { tv } from "../utils";

function DayDate({ match, date, redirect, breakout=false }) {
    if (breakout) {
        return (
            <td className={match.competition} onClick={() => tv(match, true)}>
                {(match.competition === "BLANK") ?
                    (<>

                    </>) : (
                        <>
                            {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
                        </>
                    )}
            </td>
        )
    }
    return (
        <td className={match.competition} onClick={() => { if (tv(match, false)) { redirect(match.sport); } }}>
            {(match.competition === "BLANK") ?
                (<>

                </>) : (
                    <>
                        {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
                    </>
                )}
        </td>
    )
}

export default DayDate;