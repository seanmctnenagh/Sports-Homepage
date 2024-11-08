import axios from "axios";
import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";

import { teamOrder, versusSymbol, sportCheck, checkDates, ip } from "./utils";

import Competition from "./TableElements/Competition";
import Title from "./TableElements/Title";
import DayDate from "./TableElements/DayDate";
import Time from "./TableElements/Time";
import Score from "./TableElements/Score";
import Highlights from "./TableElements/Highlights";
import RecapStream from "./TableElements/RecapStream";

const HockeyPast = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    function getData() {
        axios.get(`http://${ip}:3001/matches`).then((response) => {
            setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));
            // setListOfShowScores(initializeArrayWithValues(0, response.length));
        });

    }
    
    return (
        <div className="NextWeek">
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, "past")) { return null }

                        if ( !sportCheck(match, "Hockey") ){return null;}

                        let date = new Date(match.date);

                        let vs = versusSymbol(match, true);

                        let [team1, team2] = teamOrder(match);

                        return (
                            <tr key={match.matchId}>
                                {/*        Competition        */}
                                <Competition match={match} />

                                
                                {/*        Team vs Team        */}
                                <Title match={match} team1={team1} team2={team2} vs={vs} breakout={true} />


                                {/*        Date & Day        */}
                                <DayDate match={match} date={date} breakout={true} />


                                {/*        Time        */}
                                <Time match={match} date={date} breakout={true} />


                                {/*        Score        */}
                                <Score match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} />


                                {/*        Highlights        */}
                                <Highlights match={match} />


                                {/*        ESPN Recap / Stream        */}
                                <RecapStream match={match} />
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default HockeyPast;
