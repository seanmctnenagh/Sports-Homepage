import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";

import NextWeek from "./Components/NextWeek";
import Last3Days from "./Components/Last3Days";
import NavBar from "./Components/NavBar";
import HockeyFuture from "./Components/HockeyFuture";
import HockeyPast from "./Components/HockeyPast";
import NBAPast from "./Components/NBAPast";
import NBAFuture from "./Components/NBAFuture";

function App() {

	useEffect(() => {
		document.title = "Sports Homepage";
	}, []);

	function zoomOutMobile() {
		var viewport = document.querySelector('meta[name="viewport"]');
		
		if ( viewport ) {
			viewport.content = "initial-scale=0.1";
			viewport.content = "width=800";
		}
	}
      
    zoomOutMobile();

	return (
		<div>
			<head>
				<title>Sports Homepage</title>
			</head>

			<Router>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<NextWeek />
					</Route>
					<Route exact path="/nextWeek">
						<NextWeek />
					</Route>
					<Route exact path="/last3Days">
						<Last3Days />
					</Route>
					<Route path="/highlights">
						<button>Highlights</button>
					</Route>
					<Route path="/hockeyFuture">
						<HockeyFuture />
					</Route>
					<Route path="/hockeyPast">
						<HockeyPast />
					</Route>
					<Route path="/nbaPast">
						<NBAPast/>
					</Route>
					<Route path="/nbaFuture">
						<NBAFuture />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
