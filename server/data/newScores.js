const e = require("express");
const { Matches } = require("../models");
const { Op } = require("sequelize");

function scores() {
	console.log(`${new Date().getHours()}:${new Date().getMinutes()} - Checking for scores`)

	let nowUnix = Date.now().valueOf() / 1000;

	Matches.findAll({
		where: {
			completed: 0,
			endDate: {
				[Op.lt]: nowUnix,
			},
		},
	})
		.then((matches) => {
			processMatches(matches);
		})
		.catch((error) => {
			console.error("Failed to retrieve data : ", error);
		});
	return 0;
}

function processMatches(matches) {
	let count = matches.length;

	let soccerList = [];
	let baseballList = [];
	let hockeyList = [];
	let footballList = [];
	let aflList = [];
	let rugbyList = [];
	let nbaList = [];
	let f1List = [];

	for (let i = 0; i < count; i++) {
		switch (matches[i].sport) {
			case "Soccer":
				soccerList.push(matches[i]);
				break;
			case "NFL":
				footballList.push(matches[i]);
				break;
			case "AFL":
				aflList.push(matches[i]);
				break;
			case "Baseball":
				baseballList.push(matches[i]);
				break;
			case "Hockey":
				hockeyList.push(matches[i]);
				break;
			case "Rugby":
				rugbyList.push(matches[i]);
				break;
			case "Basketball":
				nbaList.push(matches[i]);
				break;
			// case "F1":
			// 	f1List.push(matches[i]);
			// 	break;
		}
	}

	if (aflList.length) {
		afl(aflList);
	}

	if (soccerList.length) {
		soccer(soccerList);
	}

	if (footballList.length) {
		nfl(footballList);
	}

	if (baseballList.length) {
		baseball(baseballList);
	}

	if (rugbyList.length) {
		rugby(rugbyList);
	}

	if (hockeyList.length) {
		hockey(hockeyList);
	}

	if (nbaList.length) {
		NBA(nbaList);
	}

	if (f1List.length) {
		f1(f1List);
	}
}

function afl(matches) {
	console.log("Getting AFL Scores...");
}




function nfl(matches) {
	console.log("Getting NFL Scores...");
	let matchCount = matches.length;

	let dates = [];
	let matchIds = [];

	for (let j = 0; j < matchCount; j++) {
		let date = matches[j].dataValues.date.split("T")[0];
		if (!dates.includes(date)) { dates.push(date) }
		matchIds.push(matches[j].dataValues.matchId);
	}

	for (let i = 0; i < dates.length; i++) {
		let url = `https://v1.american-football.api-sports.io/games?date=${dates[i]}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {

				let matches = data.response;
				let matchCount = data.results;

				for (let x = 0; x < matchCount; x++) {
					if (matchIds.includes(matches[x].game.id.toString())) {
						updateNfl(matches[x]);
					}
				}
			});
	}


}

function updateNfl(match) {
	let completed = "0";
	let score = null;
	let minute = null;

	if (match.game.status.short == "FT" || match.game.status.short == "AOT") {
		completed = 1;
		score = `${match.scores.away.total}-${match.scores.home.total}`;
		minute = match.game.status.short;
	} else if (match.game.status.long.includes("OT")) {
		completed = 1;
		score = `${match.scores.away.total}-${match.scores.home.total}`;
		minute = match.game.status.long;
	} else {
		minute = match.game.status.timer;
	}

	Matches.update(
		{
			completed: completed,
			score: score,
			minute: minute,
		},
		{ where: { matchId: match.game.id } }
	).catch((err) => console.log(`Error in scores - football(): ${err}`));
}




function soccer(matches) {
	console.log("Getting Soccer Scores...");
	let matchCount = matches.length;

	let dates = [];
	let matchIds = [];

	for (let j = 0; j < matchCount; j++) {
		let date = matches[j].dataValues.date.split("T")[0];
		if (!dates.includes(date)) { dates.push(date) }
		matchIds.push(matches[j].dataValues.matchId);
	}

	for (let i = 0; i < dates.length; i++) {
		let url = `https://v3.football.api-sports.io/fixtures?date=${dates[i]}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {

				let matches = data.response;
				let matchCount = data.results;

				for (let x = 0; x < matchCount; x++) {
					if (matchIds.includes(matches[x].fixture.id.toString())) {
						updateSoccer(matches[x]);
					}
				}
			});
	}


}

function updateSoccer(match) {
	let completed = false;
	let score = null;
	let minute = null;
	try {
		if (match.fixture.status.short == "FT" || match.fixture.status.short == "AET") {
			completed = 1;
			score = `${match.goals.home}-${match.goals.away}`;
			minute = match.fixture.status.short;
		} else if (match.fixture.status.short == "PEN") {
			completed = 1;
			score = `${match.goals.home}-${match.goals.away} (${match.score.penalty.home}-${match.score.penalty.away})`;
			minute = match.fixture.status.short;
		} else if (["PST", "ABD", "CANC"].includes(match.fixture.status.short)) {
			completed = 1;
			score = match.fixture.status.long;
			minute = null;
		} else {
			minute = match.fixture.status.timer;
		}
	} catch (err) {
		console.log(match.matchId);
		console.log(match);
	}

	Matches.update(
		{
			completed: completed,
			score: score,
			minute: minute,
		},
		{ where: { matchId: match.fixture.id } }
	).catch((err) => console.log(`Error in scores - soccer(): ${err}`));
}




function baseball(matches) {
	console.log("Getting Baseball Scores...");
	let matchCount = matches.length;

	let dates = [];
	let matchIds = [];

	for (let j = 0; j < matchCount; j++) {
		let date = matches[j].dataValues.date.split("T")[0];
		if (!dates.includes(date)) { dates.push(date) }
		matchIds.push(matches[j].dataValues.matchId);
	}

	for (let i = 0; i < dates.length; i++) {
		let url = `https://v1.baseball.api-sports.io/games?date=${dates[i]}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {

				let matches = data.response;
				let matchCount = data.results;

				for (let x = 0; x < matchCount; x++) {
					if (matchIds.includes(matches[x].id.toString())) {
						updateBaseball(matches[x]);
					}
				}
			});
	}


}

function updateBaseball(match) {
	let completed = false;
	let score = null;
	let minute = null;
	try {
		if (match.status.short == "FT") {
			completed = 1;
			score = `${match.scores.away.total}-${match.scores.home.total}`;
			minute = match.status.short;
		} else {
			minute = match.status.short;
		}
	} catch (err) {
		console.log(match.matchId);
		console.log(match);
	}

	Matches.update(
		{
			completed: completed,
			score: score,
			minute: minute,
		},
		{ where: { matchId: match.id } }
	).catch((err) => console.log(`Error in scores - baseball(): ${err}`));
}




function rugby(matches) {
	console.log("Getting Rugby Scores...");
	let matchCount = matches.length;

	let dates = [];
	let matchIds = [];

	for (let j = 0; j < matchCount; j++) {
		let date = matches[j].dataValues.date.split("T")[0];
		if (!dates.includes(date)) { dates.push(date) }
		matchIds.push(matches[j].dataValues.matchId);
	}

	for (let i = 0; i < dates.length; i++) {
		let url = `https://v1.rugby.api-sports.io/games?date=${dates[i]}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {

				let matches = data.response;
				let matchCount = data.results;

				for (let x = 0; x < matchCount; x++) {
					if (matchIds.includes(matches[x].id.toString())) {
						updateRugby(matches[x]);
					}
				}
			});
	}


}

function updateRugby(match) {
	let completed = false;
	let score = null;
	let minute = null;
	try {
		if (match.status.short == "FT" || match.status.short == "AET") {
			completed = 1;
			score = `${match.scores.home}-${match.scores.away}`;
			minute = match.status.short;
		} else if (match.status.short == ["PST", "CANC", "ABD", "ABD", "AW"]) {
			completed = 1;
			score = match.status.long;
			minute = null;
		} 
	} catch (err) {
		console.log(match.matchId);
		console.log(match);
	}

	Matches.update(
		{
			completed: completed,
			score: score,
			minute: minute,
		},
		{ where: { matchId: match.id } }
	).catch((err) => console.log(`Error in scores - rugby(): ${err}`));
}




function hockey(matches) {
	console.log("Getting Hockey Scores...");
	let matchCount = matches.length;

	let dates = [];
	let matchIds = [];

	for (let j = 0; j < matchCount; j++) {
		let date = matches[j].dataValues.date.split("T")[0];
		if (!dates.includes(date)) { dates.push(date) }
		matchIds.push(matches[j].dataValues.matchId);
	}

	for (let i = 0; i < dates.length; i++) {
		let url = `https://v1.hockey.api-sports.io/games?date=${dates[i]}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {

				let matches = data.response;
				let matchCount = data.results;

				for (let x = 0; x < matchCount; x++) {
					if (matchIds.includes(matches[x].id.toString())) {
						updateHockey(matches[x]);
					}
				}
			});
	}


}

function updateHockey(match) {
	let completed = false;
	let score = null;
	let minute = null;
	try {
		if (match.status.short == "FT" || match.status.short == "AOT") {
			completed = 1;
			score = `${match.scores.away}-${match.scores.home}`;
			minute = match.status.short;
		} else if (match.status.short == "AP") {
			completed = 1;
			score = `${match.scores.away}-${match.scores.home} (${match.periods.penalties.split("-")[1]}-${match.periods.penalties.split("-")[0]})`;
			minute = "PEN";
		} else {
			minute = match.timer;
		}
	} catch (err) {
		console.log(match.matchId);
		console.log(match);
	}

	Matches.update(
		{
			completed: completed,
			score: score,
			minute: minute,
		},
		{ where: { matchId: match.id } }
	).catch((err) => console.log(`Error in scores - hockey(): ${err}`));
}




function NBA(matches) {
	console.log("Getting NBA Scores...");
	let matchCount = matches.length;

	let dates = [];
	let matchIds = [];

	for (let j = 0; j < matchCount; j++) {
		let date = matches[j].dataValues.date.split("T")[0];
		if (!dates.includes(date)) { dates.push(date) }
		matchIds.push(matches[j].dataValues.matchId);
	}

	for (let i = 0; i < dates.length; i++) {
		let url = `https://v1.basketball.api-sports.io/games?date=${dates[i]}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {

				let matches = data.response;
				let matchCount = data.results;

				for (let x = 0; x < matchCount; x++) {
					if (matchIds.includes(matches[x].id.toString())) {
						updateNBA(matches[x]);
					}
				}
			});
	}


}

function updateNBA(match) {
	let completed = false;
	let score = null;
	let minute = null;
	try {
		if (match.status.short == "FT" || match.status.short == "AOT") {
			completed = 1;
			score = `${match.scores.away.total}-${match.scores.home.total}`;
			minute = match.status.short;
		} else {
			minute = match.timer;
		}
	} catch (err) {
		console.log(match.matchId);
		console.log(match);
	}

	Matches.update(
		{
			completed: completed,
			score: score,
			minute: minute,
		},
		{ where: { matchId: match.id } }
	).catch((err) => console.log(`Error in scores - hockey(): ${err}`));
}



function f1(matches) {
	console.log("Getting F1 Scores...");
	let matchCount = matches.length;

	for (let j = 0; j < matchCount; j++) {
		let id = matches[j].dataValues.matchId;
		let url = `https://v1.formula-1.api-sports.io/rankings/races?race=${id}`;
		fetch(url, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if(data.results != 0) {
					updateF1(data);
				}
			});
	}


}

function updateF1(race) {
	let completed = true;
	let drivers = race.response;
	let first = drivers[0].driver.name;
	let second = drivers[1].driver.name;
	let third = drivers[2].driver.name;

	let score = `1.${first}-2.${second}-3.${third}`;

	Matches.update(
		{
			completed: completed,
			score: score,
		},
		{ where: { matchId: race.parameters.race } }
	).catch((err) => console.log(`Error in scores - f1(): ${err}`));
}


module.exports = scores;
