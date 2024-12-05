import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { checkBreakouts, ip } from "./Utils/Timeline";
import TableRow from "./TableRow";
import axios from "axios";

const Timeline = ({ settings }) => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 60000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Condition for GET request

    async function getData() {
		axios.get(`http://${ip}/matches`, { params: { comp: settings["comp"], timeframe: settings["timeframe"], numDays: settings["numDays"], includeBlanks: settings["includeBlanks"]} })
        .then(response => setListOfMatches(response.data) );
    }	
    
    let dates = {
		"NHL"               : [],
		"NBA"               : [],
		"Nations League"    : []
	}

    function getBlank(){
        let now = new Date();
        let today = new Date().setHours(now.getHours() - 6);
        let yesterday = new Date().setHours(now.getHours() - 24);
        let blankMatch = {
            sport       : "BLANK",
            competition : "BLANK",
            homeTeam    : new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(today),
            awayTeam    : new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(yesterday),
            date        : today
        }
        return blankMatch;
    }

    
    
	return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        let isBreakoutTitle = false;
                        if ( !settings["isBreakoutPage"] ){
                            [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
                            if ( match == null ) { 
                                return null; 
                            }
                        }

                        if ( index === 0 && match.competition !== "BLANK") {
                            let blank = getBlank()
                            return (
                                <>
                                <TableRow key={-1} match={blank} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} timeframe={settings["timeframe"]} />
                                <TableRow key={index} match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} timeframe={settings["timeframe"]} />
                                </>
                            )
                        }

                        if ( match.competition === "BLANK"){
                            try {
                                if (listOfMatches[index+1].competition === "BLANK"){
                                    return null;
                                }
                            }
                            catch {
                                return null;
                            }
                        } 

                        return ( <TableRow key={index} match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} timeframe={settings["timeframe"]} /> );

                    })}
                </tbody>
            </Table>
        </div>
    )
};

export default Timeline;
