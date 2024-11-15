import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { checkDates, competitionCheck, checkBreakouts, getData, redirectJSX } from "./Utils/Timeline";
import TableRow from "./TableRow";

const Timeline = ({ settings }) => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);
    const [hockeyRedirect, setHockeyRedirect] = useState(() => false);
    const [nbaRedirect, setNbaRedirect] = useState(() => false);
    const [nationsLeagueRedirect, setNationsLeagueRedirect] = useState(() => false);

    const isBreakoutPage = settings["isBreakoutPage"]; 
    const includeBlanks = settings["includeBlanks"]; 
    const timeframe = settings["timeframe"]; 
    const singleComp = settings["singleComp"]; 
    const comp = settings["comp"];

    useEffect(() => { getData(timeframe, setListOfMatches); setInterval(getData, 30000, timeframe, setListOfMatches); }, [timeframe]); // Condition for GET request

    // function getData() { axios.get(`http://${ip}:3001/matches`).then((response) => { setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix)); }); }

    function redirect(page) {
        switch (page) {
            case "NHL":
                setHockeyRedirect(true);
                break;
            case "NBA":
                setNbaRedirect(true);
                break;
            case "Nations League":
                setNationsLeagueRedirect(true);
                break;
            default:
                break;
        }
    }

    let dates = {
        "NHL": [],
        "NBA": [],
        "Nations League": []
    }

    if ( timeframe === "Past" && comp === "NBA"){
        console.log()
    }

    return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, timeframe)) { return null; }

                        if (singleComp) { if (!competitionCheck(match, comp, true)) { return null; } }

                        let isBreakoutTitle = false;
                        if (!isBreakoutPage) {
                            [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
                            if (match == null) {
                                return null;
                            }
                        }

                        match.redirect = (page) => { redirect(page) };

                        return (<TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={isBreakoutPage} isBreakoutTitle={isBreakoutTitle} includeBlanks={includeBlanks} timeframe={timeframe} />);
                    })}
                </tbody>
            </Table>
            {redirectJSX(timeframe, isBreakoutPage, hockeyRedirect, nbaRedirect, nationsLeagueRedirect)}
        </div>
    );
};

export default Timeline;
