const e = require("express");
const { Matches } = require("../models");
const { Op } = require("sequelize");

function scores() {
	console.log("Running scores()");

	let nowUnix = Date.now().valueOf() / 1000;

	Matches.findAll({
		where: {
			completed: 0,
			endDate: {
				[Op.lt]: nowUnix,
			},
		},
	})
		.then((res) => {
			processData(res);
		})
		.catch((error) => {
			console.error("Failed to retrieve data : ", error);
		});
	return 0;
}

async function processData(matches) {
	let count = matches.length;

	let soccerList = [];
	let baseballList = [];
	let hockeyList = [];
	let footballList = [];
	let aflList = [];
	let rugbyList = [];


	for (let i = 0; i < count; i++) {
		let thisMatch = matches[i].dataValues;
		switch (thisMatch.sport) {
			case "Soccer":
				soccer(thisMatch);
				break;
			case "NFL":
				nfl(thisMatch);
				break;
			case "AFL":
				afl(thisMatch);
				break;
			case "Baseball":
				mlb(thisMatch);
				break;
		}

		if (i % 10 === 0 && i != 0) {
			await new Promise((r) => setTimeout(r, 60000));
		}
	}
}

function soccer(match) {
	let url = `https://v3.football.api-sports.io/fixtures?id=${match.matchId}`;
	fetch(url, {
		method: "get",
		headers: new Headers({
			"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (
				data.errors.rateLimit ===
				"Too many requests. Your rate limit is 10 requests per minute."
			) {
				setTimeout(scores, 60000);
				return;
			}
			if (
				data.errors.requests ===
				"You have reached the request limit for the day, Go to https://dashboard.api-football.com to upgrade your plan."
			) {
				return;
			}
			data = data.response[0];

			let completed = "0";
			let score = null;
			let minute = null;
			try {
				if (data.fixture.status.short == "FT") {
					completed = 1;
					score = `${data.goals.home}-${data.goals.away}`;
					minute = data.fixture.status.short;
				} else if (data.fixture.status.short == "PEN") {
					completed = 1;
					score = `${data.goals.home}-${data.goals.away} (${data.score.penalty.home}-${data.score.penalty.away})`;
					minute = data.fixture.status.short;
				} else {
					minute = data.fixture.status.timer;
				}
			} catch (err) {
				console.log(match.matchId);
				console.log(data);
			}

			Matches.update(
				{
					completed: completed,
					score: score,
					minute: minute,
				},
				{ where: { matchId: data.fixture.id } }
			).catch((err) => console.log(`Error in scores - soccer(): ${err}`));
		});
}

function nfl(match) {
	try {
		fetch(
			`https://v1.american-football.api-sports.io/games?id=${match.matchId}`,
			{
				method: "get",
				headers: new Headers({
					"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				data = data.response[0];

				let completed = "0";
				let score = null;
				let minute = null;

				if (data.game.status.short == "FT" || data.game.status.short == "AOT") {
					completed = 1;
					score = data.scores.away.total + "-" + data.scores.home.total;
					minute = data.game.status.short;
				} else {
					minute = data.game.status.timer;
				}

				Matches.update(
					{
						completed: completed,
						score: score,
						minute: minute,
					},
					{ where: { matchId: data.game.id } }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(match);
	}
}

function afl(match) {
	try {
		fetch(`https://v1.afl.api-sports.io/games?id=${match.matchId}`, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((thisMatch) => {
				thisMatch = thisMatch.response[0];

				let completed = "0";
				let score = null;
				let minute = "";

				if (thisMatch.status.short == "FT" || thisMatch.status.short == "AOT") {
					completed = 1;
					score =
						thisMatch.scores.home.score + "-" + thisMatch.scores.away.score;
				}

				minute = thisMatch.status.short;

				Matches.update(
					{
						completed: completed,
						score: score,
						minute: minute
					},
					{ where: { matchId: thisMatch.game.id } }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(match);
	}
}

function mlb(match) {
	try {
		fetch(`https://v1.baseball.api-sports.io/games?id=${match.matchId}`, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((thisMatch) => {
				thisMatch = thisMatch.response[0];

				let completed = "0";
				let score = null;

				if (thisMatch.status.short == "FT" || thisMatch.status.short == "AOT") {
					completed = 1;
					score =
						thisMatch.scores.home.total + "-" + thisMatch.scores.away.total;
				}

				minute = thisMatch.status.short;

				Matches.update(
					{
						completed: completed,
						score: score,
						minute: minute
					},
					{ where: { matchId: thisMatch.id } }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(match);
	}
}

module.exports = scores;
