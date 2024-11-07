import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import { Redirect } from 'react-router-dom';

import Table from "react-bootstrap/Table";

import { teamOrder, versusSymbol, titleClick, ncaaRanks, compClick, highlights, checkDates, checkBreakouts, showScore } from "./utils";

const Last3Days = () => {
	const [listOfMatches, setListOfMatches] = useState([]);
	const [listOfShowScores, setListOfShowScores] = useState([]);
	const [hockeyRedirect, setHockeyRedirect] = useState(() => false);
	const [nbaRedirect, setNbaRedirect] = useState(() => false);

	useEffect(() => {
		getData();
		setInterval(getData, 30000);
	}, []); // Condition for GET request

	function getData() {
		// axios.get("//localhost:3001/matches").then((response) => {
		axios.get("http://192.168.1.15:3001/matches").then((response) => {
			setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));
			// setListOfShowScores(initializeArrayWithValues(0, response.length));
		});

	}

	// function showScore(index) {
	// 	const newItems = [...listOfShowScores];

	// 	newItems[index] = 1;

	// 	setListOfShowScores(newItems);
	// }

	function redirect(sport) {
		switch (sport) {
			case "Hockey":
				setHockeyRedirect(true);
				break;
			case "Basketball":
				setNbaRedirect(true);
				break;
			default:
				break;
		}
	}

	let nhlDates = [];
	let nbaDates = [];

	return (
		<div className="Last3Days">
			<Table responsive style={{ width: "100%" }}>
				<tbody>
					{listOfMatches.map((match, index) => {
						let date = new Date(match.date);

                        if (!checkDates(match, "past")) { return null }

						let vs = versusSymbol(match);

						let blank = false;

						[match, nbaDates, nhlDates, blank] = checkBreakouts(match, date, nbaDates, nhlDates);

                        if ( match == null || blank ) { return null; }

						let [team1, team2] = teamOrder(match);



						return (
							<tr key={match.matchId}>
                                {/*        Competition        */}
								<td className={match.competition} onClick={() => compClick(match)}>
									{(match.competition === "BLANK") ?
										(<>

										</>) : (
											<>
												{match.competition}
											</>
										)}
								</td>

                                
								{/*        Team vs Team        */}
								<td className={match.competition} onClick={() => { if(titleClick(match, false)){redirect(match.sport);}}}>
									{team1}{ncaaRanks(team1)} {vs} {team2}{ncaaRanks(team2)}
								</td>


								{/*        Date & Day        */}
								<td className={match.competition}>
									{(match.competition === "BLANK") ?
										(<>

										</>) : (
											<>
												{new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
											</>
										)}
								</td>


								{/*        Time        */}
								<td className={match.competition}>
									{(match.competition === "BLANK") ?
										null : (
											<>
												{("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}
											</>
										)}
								</td>


								{/*        Score        */}
								<td className={match.competition}>
									{
										(match.score != null) && listOfShowScores[index]
											?
											(<><p>{match.score} {match.minute}</p></>)
											:
											(match.competition === "BLANK" ? null : (match.score == null ? null : <><Button onClick={() => { setListOfShowScores(showScore(index, listOfShowScores)); }}>Score</Button></>))
									}
								</td>


								{/*        Highlights        */}			
								<td className={match.competition}>
									{
										(match.highlights)
											?
											<Button variant="warning" onClick={() => { highlights(match) }}>Highlights</Button>
											:
											null
									}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{hockeyRedirect ? (<Redirect push to="/hockeyPast" />) : null}
			{nbaRedirect ? (<Redirect push to="/nbaPast" />) : null}
		</div>
	);
};

export default Last3Days;
