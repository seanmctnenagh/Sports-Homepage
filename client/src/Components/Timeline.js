import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { checkDates, checkBreakouts, competitionCheck, getData } from "./Utils/Timeline";
import TableRow from "./TableRow";

const Timeline = ({ settings }) => {
	const [listOfMatches, setListOfMatches] = useState([]);
	const [listOfShowScores, setListOfShowScores] = useState([]);

	useEffect(() => {
        getData(settings["timeframe"], setListOfMatches);
        setInterval(getData, 30000, [settings["timeframe"], setListOfMatches]);
    }, [settings]); // Condition for GET request

    let dates = {
        "NHL"               : [],
        "NBA"               : [],
        "Nations League"    : []
    };

    return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, settings["timeframe"])) { return null; }

                        if ( settings["singleComp"]) { if ( !competitionCheck(match, settings["comp"], true) ){return null;} }

                        let isBreakoutTitle = false;
                        if ( !settings["isBreakoutPage"] ){
                            [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
                            if ( match == null ) { 
                                return null; 
                            }
                        }

                        return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} timeframe={settings["timeframe"]} /> );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Timeline;
