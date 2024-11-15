import axios from "axios";
import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";

import TableRow from "./TableRow";
import { competitionCheck, checkDates, ip } from "./Utils/Timeline";

const settings = {
	isBreakoutPage  :   true,
	includeBlanks   :   false,
	timeframe       :   "Past",
    singleComp      :   true,
    comp            :   "NBA"
}

const NBAPast = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    function getData() {axios.get(`http://${ip}:3001/matches`).then((response) => {setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));});

    }

    return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {
                        if (!checkDates(match, settings["timeframe"])) { return null }

                        if ( settings["singleComp"]) { if ( !competitionCheck(match, settings["comp"], true) ){return null;} }

                        return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} includeBlanks={settings["includeBlanks"]} /> );

                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default NBAPast;
