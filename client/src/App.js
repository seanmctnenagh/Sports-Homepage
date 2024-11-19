import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";

import NavBar from "./Components/NavBar";
import Timeline from "./Components/Timeline";
import { breakoutSettings as settings } from "./Components/Settings";

function App() {

	useEffect(() => {
		document.title = "Sports Homepage";
	}, []);

	function zoomOutMobile() {
		var viewport = document.querySelector('meta[name="viewport"]');

		if (viewport) {
			viewport.content = "initial-scale=0.1";
			viewport.content = "width=600";
		}
	}

	zoomOutMobile();

	return (
		<div>
			<Router>
				<NavBar />
				<Switch>

					<Route exact path='/'>
						<Timeline key={-1} settings={settings[0]} />
					</Route>

					{settings.map((page, index) => {
						return (
							<Route path={`/${page.url}`}>
								<Timeline key={index} settings={page} />
							</Route>
						)
					})};


					{/* Next Week */}
					{/* <Route exact path="/">
						<Timeline key={0} settings={FutureOverallSettings}  /> 
					</Route>
					<Route exact path="/nextWeek">
						<Timeline key={1} settings={FutureOverallSettings}  /> 
					</Route>
					<Route exact path="/last3Days">
						<Timeline key={2} settings={PastOverallSettings}  />
					</Route>
					<Route path="/NhlFuture">
						<Timeline key={3} settings={FutureNhlSettings}  /> 
					</Route>
					<Route path="/NhlPast">
						<Timeline key={4} settings={PastNhlSettings}  /> 
					</Route>
					<Route path="/nbaPast">
						<Timeline key={5} settings={PastNbaSettings} />
					</Route>
					<Route path="/nbaFuture">
						<Timeline key={6} settings={FutureNbaSettings} />
					</Route>
					<Route path="/nationsLeagueFuture">
						<Timeline key={7} settings={FutureNationsLeagueSettings}  /> 
					</Route>
					<Route path="/nationsLeaguePast">
						<Timeline key={8} settings={PastNationsLeagueSettings}  /> 
					</Route>
					<Route path="/NcaaFuture">
						<Timeline key={9} settings={FutureNcaaSettings}  /> 
					</Route>
					<Route path="/NcaaPast">
						<Timeline key={10} settings={PastNcaaSettings}  /> 
					</Route> */}

					{/* <Route exact path="/">
						<Timeline isBreakoutPage={false} includeBlanks={true} timeframe={"Future"} singleComp={false} comp={""} /> 
					</Route>
					<Route exact path="/nextWeek">
						<Timeline isBreakoutPage={false} includeBlanks={true} timeframe={"Future"} singleComp={false} comp={""} /> 
					</Route>
					<Route exact path="/last3Days">
						<Timeline isBreakoutPage={false} includeBlanks={false} timeframe={"Past"} singleComp={false} comp={""} /> 
					</Route>
					<Route path="/NhlFuture">
						<Timeline isBreakoutPage={true} includeBlanks={true} timeframe={"Future"} singleComp={true} comp={"NHL"} /> 
					</Route>
					<Route path="/NhlPast">
						<Timeline isBreakoutPage={true} includeBlanks={false} timeframe={"Past"} singleComp={true} comp={"NHL"} /> 
					</Route>
					<Route path="/nbaFuture">
						<Timeline isBreakoutPage={true} includeBlanks={true} timeframe={"Future"} singleComp={true} comp={"NBA"} /> 
					</Route>
					<Route path="/nbaPast">
						<Timeline isBreakoutPage={true} includeBlanks={false} timeframe={"Past"} singleComp={true} comp={"NBA"} /> 
					</Route>
					<Route path="/nationsLeagueFuture">
						<Timeline isBreakoutPage={true} includeBlanks={true} timeframe={"Future"} singleComp={true} comp={"Nations League"} /> 
					</Route>
					<Route path="/nationsLeaguePast">
						<Timeline isBreakoutPage={true} includeBlanks={false} timeframe={"Past"} singleComp={true} comp={"Nations League"} /> 
					</Route> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
