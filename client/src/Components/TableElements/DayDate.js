import { tv } from "../Utils/DateTime";

function DayDate({ match, isBreakoutPage }) {
    let redirect = (page) => {match.redirect(page)};
    let date = new Date(match.date);
    if (isBreakoutPage) {
        return (
            <td className={match.competition} onClick={() => tv(match, isBreakoutPage)}>
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
        <td className={match.competition} onClick={() => { if (tv(match, isBreakoutPage)) { redirect(match.sport); } }}>
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