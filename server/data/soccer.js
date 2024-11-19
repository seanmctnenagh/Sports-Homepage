const { Matches } = require("../models");

function getSoccerData() {
	let today = new Date();
	let day = ("0" + today.getDate()).slice(-2);
	let month = ("0" + (today.getMonth() + 1)).slice(-2);
	let year = today.getFullYear();

	let date = year + "-" + month + "-" + day;

	// let fortnightAway = new Date(Date.now() + 12096e5);
	// day = ("0" + fortnightAway.getDate()).slice(-2);
	// month = ("0" + (fortnightAway.getMonth() + 1)).slice(-2);
	// year = fortnightAway.getFullYear();

	// fortnightAway = year + '-' + month + '-' + day;

	// let season = year;
	// if(today.getMonth() < 7){
	//     season = season - 1;
	// }

	for (let i = 0; i < 10; i++) {
		fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, {
			// fetch(`https://v3.football.api-sports.io/fixtures?date=2024-09-26`, {
			method: "get",
			headers: new Headers({
				"x-rapidapi-key": "90ff826b72e0b865ca8281b84d41c423",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				// Do something with the data
				// "errorCode": 429 == Too many requests
				organiseData(data);
			})
			.catch((error) => {
				// Handle the error
				console.log("Error" + error);
			});


		let nextDay = new Date(Date.now() + 864e5 * (i + 1)); //864e5

		day = ("0" + nextDay.getDate()).slice(-2);
		month = ("0" + (nextDay.getMonth() + 1)).slice(-2);
		year = nextDay.getFullYear();

		nextDay = year + "-" + month + "-" + day;

		date = nextDay;
	}
}

function organiseData(data) {
	let count = data.results;

	for (let i = 0; i < count; i++) {
		thisMatch = data.response[i];
		
		if (!(checkTeamIds(thisMatch))) {
			if (!(checkCompIds(thisMatch))) {
				continue;
			}
		}

		if ( thisMatch.league.id == 667 ) {
			continue;
		}



		let match = { sport: "Soccer" };
		match.dateUnix = thisMatch.fixture.timestamp;
		match.date = thisMatch.fixture.date.split("+")[0] + "Z";
		match.competition = thisMatch.league.name;
		match.homeTeam = thisMatch.teams.home.name;
		match.awayTeam = thisMatch.teams.away.name;
		match.matchId = thisMatch.fixture.id;
		match.highlights = "";
		match.flashscore = "";
		match.endDate = match.dateUnix + 7200;

		if (thisMatch.score.winner == null) {
			match.completed = false;
		} else {
			match.completed = true;
		}
		match.score = null;
		match.minute = null;

		if (match.competition == "UEFA Champions League") {
			match.competition = "CL";
		} else if (match.competition == "Premier League") {
			match.competition = "PL";
		} else if (match.competition == "Premiership") {
			match.competition = "SPL";
		} else if (match.competition == "UEFA Europa League") {
			match.competition = "UEL";
		} else if (match.competition == "UEFA Europa Conference League") {
			match.competition = "UECL";
		} else if (match.competition == "UEFA Champions League Women") {
			match.competition = "UWCL";
		} else if (match.competition == "UEFA Nations League") {
			match.competition = "Nations League";
		} else if (match.competition == "UEFA Championship - Women - Qualification") {
			match.competition = "Euro Q W";
		} else if (match.competition == "Premier Division") {
			match.competition = "LOI";
		} else if (match.competition == "FA WSL") {
			match.competition = "WSL";
		} else if (match.competition == "Bundesliga") {
			match.competition = "BuLi";
		}

		if (match.homeTeam == "Brighton Hove") {
			match.homeTeam = "Brighton";
		} else if (match.homeTeam == "Wolverhampton") {
			match.homeTeam = "Wolves";
		} else if (match.homeTeam == "Ipswich Town") {
			match.homeTeam = "Ipswich";
		} else if (match.homeTeam == "Nottingham") {
			match.homeTeam = "Nottingham Forest";
		} else if (match.homeTeam == "St Patrick's Athl.") {
			match.homeTeam = "St Patrick's Athletic";
		}

		if (match.awayTeam == "Brighton Hove") {
			match.awayTeam = "Brighton";
		} else if (match.awayTeam == "Wolverhampton") {
			match.awayTeam = "Wolves";
		} else if (match.awayTeam == "Ipswich Town") {
			match.awayTeam = "Ipswich";
		} else if (match.awayTeam == "Nottingham") {
			match.awayTeam = "Nottingham Forest";
		} else if (match.awayTeam == "St Patrick's Athl.") {
			match.awayTeam = "St Patrick's Athletic";
		}

		try {
			Matches.create(match)
				.then()
				.catch((err) => {
					Matches.update(
						{
							competition: match.competition,
							homeTeam: match.homeTeam,
							awayTeam: match.awayTeam,
							date: match.date,
							dateUnix: match.dateUnix,
							completed: match.completed,
							score: match.score,
							minute: match.minute,
							highlights: match.highlights,
							endDate: match.endDate,
						},
						{ where: { matchId: match.matchId.toString() } }
					)
						.then()
						.catch((err) => console.log(err));
				});
		} catch (error) {
			console.log(`Error in PL - organiseData(): ${error.errno}`);
		}
	}
}


function checkTeamIds(thisMatch) {
	let teamIds = [
		42, // Arsenal
		33, // Man U
		34, // Newcastle
		35, // Bournemouth
		36, // Fulham
		39, // Wolves
		40, // Liverpool
		41, // Southampton
		45, // Everton
		46, // Leicester
		47, // Tottenham
		48, // West Ham
		49, // Chelsea
		50, // Manchester City
		51, // Brighton
		52, // Crystal Palace
		55, // Brentford
		66, // Aston Villa
		65, // Nottingham Forest
		80, // Lyon
		81, // Marseille
		85, // PSG
		91, // Monaco
		157, // Bayern
		165, // Dortmund
		247, // Celtic
		252, // Aberdeen
		489, // AC Milan
		492, // Napoli
		496, // Juve
		497, // Roma
		505, // Inter
		529, // Barca
		530, // Atletico
		541, // Real Madrid
		652, // Shamrock Rovers
		776, // Ireland
		1850, // Arsenal W
		14456, // Ireland W
	];

	return (teamIds.includes(thisMatch.teams.home.id) || teamIds.includes(thisMatch.teams.away.id))
}

function checkCompIds(thisMatch) {
	let competitionIds = [
		2,    // Champions League
		5,    // Nations League
		1,    // World Cup
		6,    // AFCON
		9,    // Copa America
		4,    // Euros
		3,    // Europa League
		39,   // Premier League
		45,   // FA Cup
		48,   // League Cup
		357,  // League of Ireland
		528,  // Community Shield
		848,  // UEFA Conference League
	];

	let leagueCupRounds = ["3rd Round", "4th Round", "Quarter Final", "Semi Final", "Final",];
	let faCupRounds = ["3rd Round", "4th Round", "5th Round", "Quarter Final", "Semi Final", "Final",];
	let europaRounds = [""];
	let conferenceRounds = [""];

	if (competitionIds.includes(thisMatch.league.id)) {
		if (thisMatch.league.name === "League Cup" && !(leagueCupRounds.includes(thisMatch.league.round))) { return false; }
		else if (thisMatch.league.name === "FA Cup" && !(faCupRounds.includes(thisMatch.league.round))) { return false; }
		else if (thisMatch.league.name === "UEFA Europa Conference League" && !(conferenceRounds.includes(thisMatch.league.round))) { return false; }
		else if (thisMatch.league.name === "UEFA Europa League" && !(europaRounds.includes(thisMatch.league.round))) { return false; }
		else { return true; }
	}
	else { return false }

}

module.exports = getSoccerData;
