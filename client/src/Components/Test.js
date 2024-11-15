// import axios from "axios";
// import { useEffect, useState, useRef } from "react";

// import { Redirect } from 'react-router-dom';

// import Table from "react-bootstrap/Table";

// import { checkBreakouts, checkDates, checkDatesOverall, ip } from "./Utils/Timeline";

// import Competition from "./TableElements/Competition";
// import Title from "./TableElements/Title";
// import DayDate from "./TableElements/DayDate";
// import Time from "./TableElements/Time";
// import Score from "./TableElements/Score";
// import Highlights from "./TableElements/Highlights";
// import RecapStream from "./TableElements/RecapStream";


// const Test = ( {navbarHeight} ) => {
//     const [listOfMatches, setListOfMatches] = useState([]);
//     const [listOfShowScores, setListOfShowScores] = useState([]);
//     const [hockeyRedirect, setHockeyRedirect] = useState(() => false);
// 	const [nbaRedirect, setNbaRedirect] = useState(() => false);
// 	const [nationsLeagueRedirect, setNationsLeagueRedirect] = useState(() => false);

//     useEffect(() => {
//         getData();
//         setInterval(getData, 30000);
//         setTimeout(scroll, 1000);
//     }, []); // Condition for GET request


//     function getData() {
//         axios.get(`http://${ip}:3001/matches`).then((response) => {
//             setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix));
//         });
//     }

// 	function redirect(page) {
// 		switch (page) {
// 			case "Hockey":
// 				setHockeyRedirect(true);
//                 break;
// 			case "Basketball":
// 				setNbaRedirect(true);
// 				break;
//             case "Nations League":
//                 setNationsLeagueRedirect(true);
//                 break;
// 			default:
// 				break;
// 		}
// 	}

//     let dates = {
//         "NHL"               : [],
//         "NBA"               : [],
//         "Nations League"    : []
//     }

//     const today = useRef(null);
//     const body = useRef(null);

//     function scroll() {
//         today.current?.scrollIntoView({ behavior: "instant" });
//         window.scrollBy({
//             top: -navbarHeight,
//             behavior: "instant",
//           });
//         body.current.hidden = false;
//     }

//     return (
//         <div className="NextWeek" hidden ref={body}>
//             <Table responsive style={{ width: "100%" }}>
//                 <tbody>
//                     {listOfMatches.map((match, index) => {

//                         let date = new Date(match.date);

//                         // if (!checkDates(match, "future") && !checkDates(match, "past")) { return null }

//                         if (!checkDatesOverall(match)) { return null; }

//                         let blank = false;
//                         let breakoutTitle = false;

// 						[match, dates["NBA"], dates["NHL"], dates["Nations League"], blank, breakoutTitle] = checkBreakouts(match, date, dates["NBA"], dates["NHL"], dates["Nations League"]);

//                         if ( match == null ) { return null; }

//                         let id = "";
//                         let ref;
//                         if ( blank ) { 
//                             id = match.date.split("T")[0];
//                             if ( id === new Date().toISOString().split("T")[0] ) {
//                                 ref = today;
//                             }
//                         }

//                         // let today = new Date();

//                         return (
//                             <tr key={match.matchId} id={id} ref={ref}>
//                                 {/*        Competition        */}
//                                 <Competition match={match} />

                                
//                                 {/*        Team vs Team        */}
//                                 <Title match={match} redirect={redirect} />


//                                 {/*        Date & Day        */}
//                                 <DayDate match={match} redirect={redirect} />


//                                 {/*        Time        */}
//                                 <Time match={match} redirect={redirect} />


//                                 {/*        Score        */}
//                                 <Score match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} />


//                                 {/*        Highlights        */}
//                                 <Highlights match={match} />


//                                 {/*        ESPN Recap / Stream        */}
//                                 <RecapStream match={match} />
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </Table>
//             { hockeyRedirect ? (<Redirect push to="/NhlFuture"/>) : null }
//             { nbaRedirect ? (<Redirect push to="/nbaFuture"/>) : null }
//             { nationsLeagueRedirect ? (<Redirect push to="/nationsLeagueFuture"/>) : null }
//         </div>
//     );
// };
// export default Test;

