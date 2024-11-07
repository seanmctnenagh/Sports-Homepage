const { Matches } = require("../models");
const { Op } = require("sequelize");

//AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY
// https://www.googleapis.com/youtube/v3/search?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&channelId=UCxAeHdLDAatFV_vt95MSO-g&part=snippet,id&order=date&maxResults=20

function highlights() {
  let now = new Date() / 1000;
  let threeDaysAgo = now - 86400 * 3;

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
		case "Bundesliga":
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
		
    }
  }

  if (aflList.length) {
    afl(aflList);
  }

  if (nflList.length) {
    nfl(nflList);
  }

  if (ncaaList.length) {
	ncaa(ncaaList);
  }

  if (plList.length) {
	pl(plList);
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

  if (skySportsFootballList.length){
	skySportsFootball(skySportsFootballList);
  }

  if (laLigaList.length){
	laLiga(laLigaList);
  }

  if (bundesligaList.length) {
	bundesliga(bundesligaList);
  }

  if (ligue1List.length){
	ligue1(ligue1List);
  }

  if (splList.length){
	spl(splList);
  }

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

function nfl(matches) {
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

function pl(matches) {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUNAf1k0yIjyGu3k9BwAg3lg&maxResults=50`;

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
		  if (match.homeTeam === "Tottenham") {homeTerms.push("Spurs")}
		  else if (match.homeTeam === "Manchester City") {homeTerms.push("Man City")}
		  else if (match.homeTeam === "Manchester United") {homeTerms.push("Man Utd"); homeTerms.push("Man United")}

		  homeFound = homeTerms.some((term) => video.snippet.title.includes(term));

		  let awayTerms = [match.awayTeam];
		  if (match.awayTeam === "Tottenham") {awayTerms.push("Spurs")}
		  else if (match.awayTeam === "Manchester City") {awayTerms.push("Man City")}
		  else if (match.awayTeam === "Manchester United") {awayTerms.push("Man Utd"); awayTerms.push("Man United")}

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

			let teamNameAlts = {
				"Sheffield Wednesday" 	: "Sheff Wednesday",
				"Stoke City"			: "Stoke",
				"Preston"				: "PNE",
				"Manchester United" : ["Man Utd", "Man U"],
				"Manchester City" 	: "Man City",
				"Tottenham"			: "Spurs",
			}
  
  
			let homeTerms = [match.homeTeam];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam])};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.includes(term));
  


			let awayTerms = [match.awayTeam];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam])};

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

			let teamNameAlts = {
				"Bayern München" 	: "Bayern Munich",
				"Club Brugge KV" 	: "Club Brugge",
				"Ferencvarosi TC" 	: "Ferencvaros",
				"BSC Young Boys" 	: "Young Boys",
				"Manchester United" : ["Man Utd", "Man U"],
				"FC Porto" 			: "Porto",
				"Borussia Dortmund" : "Dortmund",
				"PSV Eindhoven" 	: "PSV",
				"Manchester City" 	: "Man City",
				"Paris Saint Germain" : "PSG",
				"FK Crvena Zvezda" 	: "Red Star",
				"Sparta Praha" 		: "Sparta Prague",
				"Sporting CP"		: "Sporting",
				"VfB Stuttgart"		: "Stuttgart",
				"Stade Brestois 29"	: "Brest"
			}
  
  
			let homeTerms = [match.homeTeam];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam])};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.includes(term));
  


			let awayTerms = [match.awayTeam];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam])};

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

			let teamNameAlts = {
				"AS Roma" 			: "Roma",
				"Juventus"			: "Juve"
			}
  
  
			let homeTerms = [match.homeTeam.toUpperCase()];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam].toUpperCase())};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.includes(term));
  


			let awayTerms = [match.awayTeam.toUpperCase()];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam].toUpperCase())};

			awayTerms = awayTerms.flat(Infinity);
  
			awayFound = awayTerms.some((term) => video.snippet.title.includes(term));
  

			let title = video.snippet.description.toLowerCase();

			let metaTerms = ["HIGHLIGHTS", match.score];

			highlightsFound = metaTerms.some((term) =>title.includes(term));

			highlightsFound = highlightsFound && !(title.includes("Extendend"))
  
			
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

			let teamNameAlts = {
				"Atletico Madrid"	: "Atlético Madrid",
				"Leganes"			: "Leganés"
			}
  
  
			let homeTerms = [match.homeTeam];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam])};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.includes(term));
  


			let awayTerms = [match.awayTeam];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam])};

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

		  if (match.homeTeam.endsWith(" W")){match.homeTeam = match.homeTeam.split(" W")[0]}
		  if (match.awayTeam.endsWith(" W")){match.awayTeam = match.awayTeam.split(" W")[0]}
  
		  for (let i = 0; i < vidCount; i++) {
			let video = videos.items[i];
  
			let homeFound = false;
			let awayFound = false;
			let highlightsFound = false;

			let teamNameAlts = {
				"Bayern München" : "Bayern Munich",
				"Club Brugge KV" : "Club Brugge",
				"Ferencvarosi TC" : "Ferencvaros",
				"BSC Young Boys" : "Young Boys",
				"Manchester United" : ["Man Utd", "Man U"],
				"FC Porto" : "Porto",
				"Borussia Dortmund" : "Dortmund",
				"PSV Eindhoven" : "PSV",
				"Manchester City" : "Man City",
				"Paris Saint Germain" : "PSG",
				"FK Crvena Zvezda" : "Red Star",
				"Sparta Praha" : "Sparta Prague"
			}
  
  
			let homeTerms = [match.homeTeam];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam])};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.includes(term));
  


			let awayTerms = [match.awayTeam];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam])};

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
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam].toLowerCase())};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term));
  


			let awayTerms = [match.awayTeam.toLowerCase()];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam].toLowerCase())};

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

			let teamNameAlts = {
				"Bayern München" : "Bayern Munich",
				"Borussia Dortmund" : "Dortmund",
			}
  
			let homeTerms = [match.homeTeam.toLowerCase()];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam].toLowerCase())};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term));
  


			let awayTerms = [match.awayTeam.toLowerCase()];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam].toLowerCase())};

			awayTerms = awayTerms.flat(Infinity);
  
			awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term));
  

			let title = video.snippet.title.toLowerCase();

			let metaTerms = ["highlights", match.score];

			highlightsFound = metaTerms.some((term) =>title.includes(term));
  
			
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

			let teamNameAlts = {
				"Paris Saint Germain"	: ["Paris Saint-Germain", "PSG"],
				"Marseille"				: "l'OM"
			}
  
			let homeTerms = [match.homeTeam];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam])};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));
  


			let awayTerms = [match.awayTeam];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam])};

			awayTerms = awayTerms.flat(Infinity);
  
			awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));
  

			let title = video.snippet.description.toLowerCase();

			let metaTerms = [match.score];

			highlightsFound = metaTerms.some((term) =>title.includes(term));
  
			
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

			let teamNameAlts = {};

			if (match.homeTeam.endsWith(" W")){match.homeTeam = match.homeTeam.split(" W")[0]}
			if (match.awayTeam.endsWith(" W")){match.awayTeam = match.awayTeam.split(" W")[0]}  
  
			let homeTerms = [match.homeTeam.toLowerCase()];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam].toLowerCase())};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term));
  


			let awayTerms = [match.awayTeam.toLowerCase()];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam].toLowerCase())};

			awayTerms = awayTerms.flat(Infinity);
  
			awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term));
  

			let title = video.snippet.title.toLowerCase();

			let metaTerms = ["highlights", match.score];

			highlightsFound = metaTerms.some((term) =>title.includes(term));
  
			
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

			let teamNameAlts = {};
  
  
			let homeTerms = [match.homeTeam];
			if (teamNameAlts.hasOwnProperty(match.homeTeam)) {homeTerms.push(teamNameAlts[match.homeTeam])};

			homeTerms = homeTerms.flat(Infinity);
  
			homeFound = homeTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));
  


			let awayTerms = [match.awayTeam];
			if (teamNameAlts.hasOwnProperty(match.awayTeam)) {awayTerms.push(teamNameAlts[match.awayTeam])};

			awayTerms = awayTerms.flat(Infinity);
  
			awayFound = awayTerms.some((term) => video.snippet.title.toLowerCase().includes(term.toLowerCase()));
  

			let title = video.snippet.title.toLowerCase();

			let metaTerms = [match.score];

			highlightsFound = metaTerms.some((term) =>title.includes(term));
  
			
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
	  "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDSVKwHTlQATHyqEmCVZYJiGKPKgLge0YY&part=snippet&playlistId=UUVhibwHk4WKw4leUt6JfRLg&maxResults=50",
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

		//   let date = new Date(parseInt(match.dateUnix) * 1000)
		//   date.setHours(date.getHours() - 4);

		//   let day = date.getDate();
		//   let month = date.getMonth() + 1;
		//   let year = date.getFullYear().toString().slice(-2);

		//   date = `${month}/${day}/${year}`;

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
 
module.exports = highlights;