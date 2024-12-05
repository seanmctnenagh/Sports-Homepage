const { Matches } = require("../models");
const { Op } = require("sequelize");
const { get } = require("../routes/Matches");

let plList = [];
let mlbList = [];
let nflList = [];
let aflList = [];
let clList = [];
let serieAList = [];
let ncaaList = [];
let leagueCupList = [];
let uwclList = [];
let nhlList = [];
let loiList = [];
let skySportsFootballList = []; // SPL, WSL
let bundesligaList = [];
let laLigaList = [];
let ligue1List = [];
let splList = [];
let nbaList = [];
let dfbPokalList = [];
let urcList = [];
let f1List = [];

const teamNameAlts = {
	"Manchester United"		: ["Man Utd", "Man U"],
	"Manchester City"		: "Man City",
	"Tottenham"				: "Spurs",
	"Sheffield Wednesday"	: "Sheff Wednesday",
	"Stoke City"			: "Stoke",
	"Preston"				: "PNE",
	"Bayern München"		: "Bayern Munich",
	"Club Brugge KV"		: "Club Brugge",
	"Ferencvarosi TC"		: "Ferencvaros",
	"BSC Young Boys"		: "Young Boys",
	"FC Porto"				: "Porto",
	"PSV Eindhoven"			: "PSV",
	"FK Crvena Zvezda"		: "Red Star",
	"Sparta Praha"			: "Sparta Prague",
	"Sporting CP"			: "Sporting",
	"VfB Stuttgart"			: "Stuttgart",
	"Stade Brestois 29"		: "Brest",
	"The New Saints"		: "TNS",
	"AS Roma"				: "Roma",
	"Juventus"				: "Juve",
	"AC Milan"				: "Milan",
	"Atletico Madrid"		: "Atlético Madrid",
	"Leganes"				: "Leganés",
	"Celta Vigo" 			: "Celta",
	"Alaves" 				: "Alavés",
	"Borussia Dortmund"		: ["Dortmund", "BVBs", "BVB"],
	"FSV Mainz 05"			: "Mainz",
	"FC St. Pauli"			: "St. Pauli",
	"SC Freiburg" 			: "Freiburg",
	"Paris Saint Germain"	: ["Paris Saint-Germain", "PSG"],
	"Marseille"				: ["l'OM", "OM"],
	"Lyon"					: ["Olympique Lyonnais", "l'OL", "OL"],
	"Saint Etienne"			: "ASSE",
	"Heart Of Midlothian" 	: "Hearts",
	"Hibernian" 			: "Hibs",
	"Q3"					: "Qualifying",
	"Sprint Q3"				: "Sprint Qualifying"
}

const settings = {
	"PL" : {
		"list" : plList,
		"id" : "UUNAf1k0yIjyGu3k9BwAg3lg",
		"searchLocation" : "description",
		"metaTerms" : ["Highlights"]
	},
	"NFL" : {
		"list" : nflList,
		"id" : "UUDVYQ4Zhbm3S2dlz7P1GBDg",
		"searchLocation" : "title",
		"metaTerms" : ["Highlights"]
	},
	"NCAA" : {
		"list"  : ncaaList,
		"id"	: "UUzRWWsFjqHk1an4OnVPsl9g",
		"searchLocation" : "title",
		"metaTerms" : ["Highlights"]
	},
	"SkySportsFootball" : {
		"list"  : skySportsFootballList,
		"id"	: "UUZ7wY7MRDSygp63HIEfdQZA",
		"searchLocation" : "title",
		"metaTerms" : ["Highlights", "Score"]
	},
	"La Liga" : {
		"list"  : laLigaList,
		"id"	: "UUTj2CVogkBMbPejYWPh9GmA",
		"searchLocation" : "title",
		"metaTerms" : ["Highlights"]
	},
	"SPL" : {
		"list"  : splList,
		"id"	: "UUakRszbIjjGYtFrDPeg5Ieg",
		"searchLocation" : "title",
		"metaTerms" : ["Score"]
	},
	"F1" : {
		"list"	: f1List,
		"id"	: "UUB_qr75-ydFVKSF9Dmo6izg",
		"searchLocation" : "title",
		"metaTerms" : ["Highlights"]
	}

}

function highlights() {
	let now = new Date() / 1000;
	let threeDaysAgo = now - 86400 * 6;

	Matches.findAll({
		where: {
			endDate: {
				[Op.between]: [threeDaysAgo, now],
			},
			highlights: {
				[Op.or]: [null, ""],
			},
		},
	})
		.then((matches) => {
			processMatches(matches);
		})
		.catch((error) => {
			console.error("Failed to retrieve data : ", error);
		});
}




function processMatches(matches) {
	let count = matches.length;

	for (let i = 0; i < count; i++) {
		switch (matches[i].competition) {
			case "PL":
				plList.push(matches[i]);
				break;
			case "NFL":
				nflList.push(matches[i]);
				break;
			case "AFL":
				aflList.push(matches[i]);
				break;
			case "MLB":
				mlbList.push(matches[i]);
				break;
			case "CL":
			case "UEL":
			case "UECL":
				clList.push(matches[i]);
				break;
			case "Coppa Italia":
			case "Serie A":
				serieAList.push(matches[i]);
				break;
			case "NCAA":
				ncaaList.push(matches[i]);
				break;
			case "League Cup":
				leagueCupList.push(matches[i]);
				break;
			case "UWCL":
				uwclList.push(matches[i]);
				break;
			case "NHL":
				nhlList.push(matches[i]);
				break;
			case "LOI":
				loiList.push(matches[i]);
				break;
			case "BuLi":
				bundesligaList.push(matches[i]);
				break;
			case "SPL":
				splList.push(matches[i]);
				break;
			case "WSL":
				skySportsFootballList.push(matches[i])
				break;
			case "La Liga":
				laLigaList.push(matches[i]);
				break;
			case "Ligue 1":
				ligue1List.push(matches[i]);
				break;
			case "NBA":
				nbaList.push(matches[i]);
				break;
			case "DFB Pokal":
				dfbPokalList.push(matches[i]);
				break;
			case "URC":
				urcList.push(matches[i]);
				break;
			case "F1":
				f1List.push(matches[i]);
				break;

		}
	}

	if ( plList.length ) {
		getHighlights(settings["PL"]);
	}

	if ( nflList.length ) {
		getHighlights(settings["NFL"]);
	}

	if (ncaaList.length) {
		getHighlights(settings["NCAA"]);
	}

	if (laLigaList.length) {
		getHighlights(settings["La Liga"]);
	}

	if (splList.length) {
		getHighlights(settings["SPL"]);
	}

	if ( f1List.length ) {
		getHighlights(settings["F1"]);
	}

	if (mlbList.length) {
		mlb(mlbList);
	}

	if (clList.length) {
		cl(clList);
	}

	if (serieAList.length) {
		serieA(serieAList);
	}

	if (leagueCupList.length) {
		leagueCup(leagueCupList);
	}

	if (uwclList.length) {
		uwcl(uwclList);
	}

	if (nhlList.length) {
		nhl(nhlList);
	}

	if (loiList.length) {
		loi(loiList);
	}

	if (skySportsFootballList.length) {
		skySportsFootball(skySportsFootballList);
	}

	if (bundesligaList.length) {
		bundesliga(bundesligaList);
	}

	if (dfbPokalList.length) {
		premierSports(dfbPokalList);
	}

	if (ligue1List.length) {
		ligue1(ligue1List);
	}

	if (nbaList.length) {
		nba(nbaList);
	}

	if ( urcList.length ) {
		urc(urcList);
	}

	if (aflList.length) {
		afl(aflList);
	}

}


async function getVideos(id) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=${id}&maxResults=50`;

	let response = await fetch(url, { method: "get" });

	return response.json();
}

async function getHighlights(settings){
	let matches = settings["list"];
	let id = settings["id"];
	let searchLocation = settings["searchLocation"];
	let metaTerms = settings["metaTerms"];
	let scoreIndex = metaTerms.indexOf("Score");

	let videos = await getVideos(id);
	let vidCount = videos.pageInfo.resultsPerPage;
	let matchCount = matches.length;

	for (let j = 0; j < matchCount; j++) {
		let match = matches[j].dataValues;

		if (match.homeTeam.startsWith("FC ")) { match.homeTeam = match.homeTeam.split("FC ")[0] }
		if (match.awayTeam.startsWith("FC ")) { match.awayTeam = match.awayTeam.split("FC ")[0] }
		if (match.homeTeam.endsWith(" FC")) { match.homeTeam = match.homeTeam.split(" FC")[0] }
		if (match.awayTeam.endsWith(" FC")) { match.awayTeam = match.awayTeam.split(" FC")[0] }
		if (match.homeTeam.endsWith(" W")) { match.homeTeam = match.homeTeam.split(" W")[0] }
		if (match.awayTeam.endsWith(" W")) { match.awayTeam = match.awayTeam.split(" W")[0] }
		if (match.homeTeam.endsWith("GP")) { match.homeTeam = match.homeTeam.split("GP")[0] + "Grand Prix"}

		let homeTerms = [match.homeTeam];
		if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };
		homeTerms = homeTerms.flat(Infinity);

		let awayTerms = [match.awayTeam];
		if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };
		awayTerms = awayTerms.flat(Infinity);

		if (scoreIndex !== -1) { metaTerms[scoreIndex] = match.score; }



		for (let i = 0; i < vidCount; i++) {
			let video = videos.items[i];

			let homeFound = false;
			let awayFound = false;
			let highlightsFound = false;

			homeFound = homeTerms.some((term) => video.snippet.title.toUpperCase().includes(term.toUpperCase()));
			awayFound = awayTerms.some((term) => video.snippet.title.toUpperCase().includes(term.toUpperCase()));

			if (video.snippet.title.toUpperCase().includes("SPRINT") && !match.awayTeam.toUpperCase().includes("SPRINT")) {
				homeFound = false;
			}
			if (video.snippet.title.toUpperCase().includes("QUALIFYING") && !match.awayTeam.toUpperCase().includes("Q3")) {
				homeFound = false;
			}

			let videoString = video.snippet[searchLocation];

			highlightsFound = metaTerms.every((term) => videoString.toUpperCase().includes(term.toUpperCase()));

			highlightsFound = highlightsFound && !(videoString.includes("Extended")) && !(videoString.includes("F2"))


			if (homeFound && awayFound && highlightsFound) {
				link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
				Matches.update(
					{
						highlights: link,
					},
					{ where: { matchId: match.matchId } }
				).catch((err) => console.log(err));
			}
		}
	}
}













async function pl() {
	if ( !plList.length ) { return; }
	let matches = plList;
	let matchCount = matches.length;
	let id = "UUNAf1k0yIjyGu3k9BwAg3lg";

	let videos = await getVideos(id);
	let vidCount = videos.pageInfo.resultsPerPage;

	for (let j = 0; j < matchCount; j++) {
		let match = matches[j].dataValues;

		let homeTerms = [match.homeTeam];
		if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };
		homeTerms = homeTerms.flat(Infinity);

		let awayTerms = [match.awayTeam];
		if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };
		awayTerms = awayTerms.flat(Infinity);
		
		let metaTerms = ["Highlights"];

		for (let i = 0; i < vidCount; i++) {
			let video = videos.items[i];

			let homeFound = false;
			let awayFound = false;
			let highlightsFound = false;

			homeFound = homeTerms.some((term) => video.snippet.title.toUpperCase().includes(term.toUpperCase()));
			awayFound = awayTerms.some((term) => video.snippet.title.toUpperCase().includes(term.toUpperCase()));

			let title = video.snippet["description"];

			highlightsFound = metaTerms.every((term) => title.toUpperCase().includes(term.toUpperCase()));


			if (homeFound && awayFound && highlightsFound) {
				link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
				Matches.update(
					{
						highlights: link,
					},
					{ where: { matchId: match.matchId } }
				).catch((err) => console.log(err));
			}
		}
	}
}

function nfl() {
	if ( !nflList.length ) { return; }
	let matches = nflList;

	let url = "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUDVYQ4Zhbm3S2dlz7P1GBDg&maxResults=50";
	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let terms = [match.homeTeam, match.awayTeam, "Highlights"];

					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			console.log("Error" + error);
		});
}

function ncaa(matches) {
	let url = "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUzRWWsFjqHk1an4OnVPsl9g&maxResults=50";
	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let terms = [match.homeTeam, match.awayTeam, "Highlights"];

					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			console.log("Error" + error);
		});
}

function leagueCup(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUZ7wY7MRDSygp63HIEfdQZA&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;


					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.includes(term));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.includes(term));

					highlightsFound = (video.snippet.title.includes("Highlights"));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function cl(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UU4i_9WvfPRTuRWEaWyfKuFw&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;


					if (match.homeTeam.startsWith("FC ")) { match.homeTeam = match.homeTeam.split("FC ")[0] }
					if (match.awayTeam.startsWith("FC ")) { match.awayTeam = match.awayTeam.split("FC ")[0] }
					if (match.homeTeam.endsWith(" FC")) { match.homeTeam = match.homeTeam.split(" FC")[0] }
					if (match.awayTeam.endsWith(" FC")) { match.awayTeam = match.awayTeam.split(" FC")[0] }


					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.includes(term));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.includes(term));



					highlightsFound = (video.snippet.title.includes("Highlights"));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function serieA(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUBJeMCIeLQos7wacox4hmLQ&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					video.snippet.title = video.snippet.title.replace("-", " ");

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let homeTerms = [match.homeTeam.toUpperCase()];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam].toUpperCase()) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.includes(term));



					let awayTerms = [match.awayTeam.toUpperCase()];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam].toUpperCase()) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.includes(term));


					let title = video.snippet.title.toUpperCase();

					let metaTerms = ["HIGHLIGHTS", match.score];

					highlightsFound = metaTerms.every((term) => title.includes(term));

					highlightsFound = highlightsFound && !(title.includes("Extended"))


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function laLiga(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUTj2CVogkBMbPejYWPh9GmA&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					video.snippet.title = video.snippet.title.replace("-", " ");

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.includes(term));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.includes(term));



					highlightsFound = (video.snippet.title.includes("HIGHLIGHTS"));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function mlb(matches) {
	fetch(
		"https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUoLrcjPV5PbUrUyXq5mjc_A&maxResults=50",
		{
			method: "get",
		}
	)
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				let date = new Date(parseInt(match.dateUnix) * 1000)
				date.setHours(date.getHours() - 4);

				let day = date.getDate();
				let month = date.getMonth() + 1;
				let year = date.getFullYear().toString().slice(-2);

				date = `${month}/${day}/${year}`;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let home = match.homeTeam.split(" ");
					let away = match.awayTeam.split(" ");

					let terms = [
						home[home.length - 1],
						away[away.length - 1],
						"Highlights",
						date
					];

					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));

						break;
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function uwcl(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUxgii5f9u4YgXCeubCozbEA&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				if (match.homeTeam.endsWith(" W")) { match.homeTeam = match.homeTeam.split(" W")[0] }
				if (match.awayTeam.endsWith(" W")) { match.awayTeam = match.awayTeam.split(" W")[0] }

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let teamNameAlts = {
						"Bayern München": "Bayern Munich",
						"Club Brugge KV": "Club Brugge",
						"Ferencvarosi TC": "Ferencvaros",
						"BSC Young Boys": "Young Boys",
						"Manchester United": ["Man Utd", "Man U"],
						"FC Porto": "Porto",
						"Borussia Dortmund": "Dortmund",
						"PSV Eindhoven": "PSV",
						"Manchester City": "Man City",
						"Paris Saint Germain": "PSG",
						"FK Crvena Zvezda": "Red Star",
						"Sparta Praha": "Sparta Prague"
					}


					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.includes(term));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.includes(term));


					let title = video.snippet.title.toLowerCase()

					highlightsFound = (title.includes("highlights"));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function loi(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUVLu65vhESK74_u-6SAXqxg&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let teamNameAlts = {};


					let homeTerms = [match.homeTeam.toLowerCase()];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam].toLowerCase()) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term));



					let awayTerms = [match.awayTeam.toLowerCase()];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam].toLowerCase()) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term));


					let title = video.snippet.title.toLowerCase()

					highlightsFound = (title.includes("highlights"));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function bundesliga(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UU6UL29enLNe4mqwTfAyeNuw&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));


					let title = video.snippet.title.toLowerCase();

					let metaTerms = [match.score];

					highlightsFound = metaTerms.every((term) => title.includes(term));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function premierSports(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUTj2CVogkBMbPejYWPh9GmA&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));


					let title = video.snippet.title.toLowerCase();

					let metaTerms = [match.score];

					highlightsFound = metaTerms.every((term) => title.includes(term));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function ligue1(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUQsH5XtIc9hONE1BQjucM0g&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let title = video.snippet.description.toLowerCase();

					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => title.toLowerCase().includes(term.toLowerCase()));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => title.toLowerCase().includes(term.toLowerCase()));

					let metaTerms = [match.score];

					highlightsFound = metaTerms.every((term) => title.includes(term));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function skySportsFootball(matches) { // SPL, WSL
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUZ7wY7MRDSygp63HIEfdQZA&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					if (match.homeTeam.endsWith(" W")) { match.homeTeam = match.homeTeam.split(" W")[0] }
					if (match.awayTeam.endsWith(" W")) { match.awayTeam = match.awayTeam.split(" W")[0] }

					let homeTerms = [match.homeTeam.toLowerCase()];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam].toLowerCase()) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term));



					let awayTerms = [match.awayTeam.toLowerCase()];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam].toLowerCase()) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term));


					let title = video.snippet.title.toLowerCase();

					let metaTerms = ["highlights", match.score];

					highlightsFound = metaTerms.every((term) => title.includes(term));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function spl(matches) {
	let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUakRszbIjjGYtFrDPeg5Ieg&maxResults=50`;

	fetch(url, { method: "get" })
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let homeFound = false;
					let awayFound = false;
					let highlightsFound = false;

					let homeTerms = [match.homeTeam];
					if (teamNameAlts.hasOwnProperty(match.homeTeam)) { homeTerms.push(teamNameAlts[match.homeTeam]) };

					homeTerms = homeTerms.flat(Infinity);

					homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));



					let awayTerms = [match.awayTeam];
					if (teamNameAlts.hasOwnProperty(match.awayTeam)) { awayTerms.push(teamNameAlts[match.awayTeam]) };

					awayTerms = awayTerms.flat(Infinity);

					awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));


					let title = video.snippet.title.toLowerCase();

					let metaTerms = [match.score];

					highlightsFound = metaTerms.every((term) => title.includes(term));


					if (homeFound && awayFound && highlightsFound) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function nhl(matches) {
	fetch(
		"https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUqFMzb-4AUf6WAIbl132QKA&maxResults=50",//UUVhibwHk4WKw4leUt6JfRLg",
		{
			method: "get",
		}
	)
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let home = match.homeTeam.split(" ");
					let away = match.awayTeam.split(" ");

					let terms = [
						home[home.length - 1],
						away[away.length - 1],
						"Highlights"
					];

					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));

						break;
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function nba(matches) {
	fetch(
		"https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UULd4dSmXdrJykO_hgOzbfPw&maxResults=50",
		{
			method: "get",
		}
	)
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				let home = match.homeTeam.split(" ");
				let away = match.awayTeam.split(" ");

				let terms = [
					home[home.length - 1],
					away[away.length - 1],
					"Recap",
					match.score.split("-")
				];

				terms = terms.flat(1);

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];



					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));

						break;
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function urc(matches) {
	fetch(
		"https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UU-S6cXyil4qbIPfb2hrcH4w&maxResults=50",
		{
			method: "get",
		}
	)
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				let home = match.homeTeam.split(" ");
				let away = match.awayTeam.split(" ");

				let terms = [
					home[home.length - 1],
					away[away.length - 1],
					"Highlights"
				];

				terms = terms.flat(1);

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];



					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));

						break;
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

function afl(matches) {
	fetch(
		"https://www.googleapis.com/youtube/v3/search?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&channelId=UCxAeHdLDAatFV_vt95MSO-g&part=snippet,id&order=date&maxResults=20",
		{
			method: "get",
		}
	)
		.then((response) => response.json())
		.then((videos) => {
			let vidCount = videos.pageInfo.resultsPerPage;
			let matchCount = matches.length;

			for (let j = 0; j < matchCount; j++) {
				let match = matches[j].dataValues;

				for (let i = 0; i < vidCount; i++) {
					let video = videos.items[i];

					let terms = [
						match.homeTeam,
						match.awayTeam,
						"Highlights",
					];

					console.log(terms)

					const found = terms.every((term) =>
						video.snippet.title.includes(term)
					);
					if (found) {
						link = `https://www.youtube.com/watch?v=${video.id.videoId}`;
						Matches.update(
							{
								highlights: link,
							},
							{ where: { matchId: match.matchId } }
						).catch((err) => console.log(err));
					}
				}
			}
		})
		.catch((error) => {
			// Handle the error
			console.log("Error" + error);
		});
}

module.exports = highlights;