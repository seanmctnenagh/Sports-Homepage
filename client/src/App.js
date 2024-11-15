import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";

import NextWeek from "./Components/NextWeek";
import Last3Days from "./Components/Last3Days";
import NavBar from "./Components/NavBar";
import NhlFuture from "./Components/NhlFuture";
import NhlPast from "./Components/NhlPast";
import NBAPast from "./Components/NBAPast";
import NBAFuture from "./Components/NBAFuture";
import NationsLeagueFuture from "./Components/NationsLeagueFuture";
import Timeline from "./Components/Timeline";
import NationsLeaguePast from "./Components/NationsLeaguePast";

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

	const nextWeekSettings = {
		isBreakoutPage  :   false,
		includeBlanks   : 	true,
		timeframe       :	"future",
		singleComp      :   false,
		comp            :   ""
	}

	const last3DaysSettings = {
		isBreakoutPage  :   false,
		includeBlanks   : 	false,
		timeframe       :	"past",
		singleComp      :   false,
		comp            :   ""
	}

	return (
		<div>
			<Router>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<NextWeek settings={nextWeekSettings}  />
					</Route>
					<Route exact path="/nextWeek">
						<NextWeek settings={nextWeekSettings} />
					</Route>
					<Route exact path="/last3Days">
						<Last3Days settings={last3DaysSettings} />
					</Route>
					<Route path="/highlights">
						<button>Highlights</button>
					</Route>
					<Route path="/NhlFuture">
						<NhlFuture />
					</Route>
					<Route path="/NhlPast">
						<NhlPast />
					</Route>
					<Route path="/nbaPast">
						<NBAPast/>
					</Route>
					<Route path="/nbaFuture">
						<NBAFuture />
					</Route>
					<Route path="/nationsLeagueFuture">
						<NationsLeagueFuture />
					</Route>
					<Route path="/nationsLeaguePast">
						<NationsLeaguePast />
					</Route>
					<Route path="/timeline">
						<Timeline navbarHeight={56} />
					</Route>
					{/* <Route path="/test">
						<Test />
					</Route> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
