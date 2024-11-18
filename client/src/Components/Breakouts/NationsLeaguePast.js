import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { checkBreakouts, ip } from "../Utils/Timeline";
import TableRow from "../TableRow";
import { PastNationsLeagueSettings as settings } from "./Settings";

const NationsLeaguePast = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    function getData() {
		axios.get(`http://${ip}:3001/matches`, { params: { comp: settings["comp"], timeframe: settings["timeframe"], numDays: settings["numDays"], includeBlanks: settings["includeBlanks"]} }).then((response) => {
			setListOfMatches(response.data)
    	});
    }

	let dates = {
		"NHL"               : [],
		"NBA"               : [],
		"Nations League"    : []
	}


    return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        let isBreakoutTitle = false;

                        if ( !settings["isBreakoutPage"] ){
                            [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
                        }

                        return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} timeframe={settings["timeframe"]} /> );

                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default NationsLeaguePast;
