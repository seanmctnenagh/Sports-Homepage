// import axios from "axios";
// import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import TableRow from "../TableRow";
// import { checkBreakouts, ip } from "../Utils/Timeline";
// import { PastNbaSettings as settings } from "../Settings";
import Timeline from "../Timeline";

const NBAPast = ({ settings }) => {
    // const [listOfMatches, setListOfMatches] = useState([]);
    // const [listOfShowScores, setListOfShowScores] = useState([]);

	// let dates = {}
	// 	"NHL"               : [],
	// 	"NBA"               : [],
	// 	"Nations League"    : []
	// }

    return (
        <Timeline settings={settings}/>// listOfMatches={listOfMatches} setListOfMatches={setListOfMatches} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} />
        // <div>
        //     <Table responsive style={{ width: "100%" }}>
        //         <tbody>
        //             {listOfMatches.map((match, index) => {
        //                 // if (!checkDates(match, settings["timeframe"], settings["numDays"])) { return null; }

        //                 // if ( settings["singleComp"]) { if ( !competitionCheck(match, settings["comp"], true) ){return null;} }
        //                 let isBreakoutTitle = false;
        //                 if ( !settings["isBreakoutPage"] ){
        //                     [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
        //                 }

        //                 return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} timeframe={settings["timeframe"]} /> );

        //             })}
        //         </tbody>
        //     </Table>
        // </div>
    );
};

export default NBAPast;
