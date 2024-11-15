import axios from "axios";
import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";

import { competitionCheck, checkDates, checkBreakouts, ip } from "./Utils/Timeline";
import TableRow from "./TableRow";

const settings = {
	isBreakoutPage  :   true,
	includeBlanks   :   false,
	timeframe       :   "past",
    singleComp      :   true,
    comp            :   "NHL"
}

let dates = {
    "NHL"               : [],
    "NBA"               : [],
    "Nations League"    : []
}


const NhlPast = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    function getData() {
        axios.get(`http://${ip}:3001/matches`).then((response) => {
            setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));
        });
    }

    return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, settings["timeframe"])) { return null }

                        if ( settings["singleComp"]) { if ( !competitionCheck(match, settings["comp"], true) ){return null;} }

                        let isBreakoutTitle = false;
                        if ( !settings["isBreakoutPage"] ){
                            [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
                        }

                        return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} /> );

                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default NhlPast;
