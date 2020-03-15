import React, { Component } from "react";
import RunLogs from "./components/RunLogs/RunLogs";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Apollo client setup
const client = new ApolloClient({
	uri: "mongodb+srv://cjroberts:runtracker@run-tracker-zcnjj.mongodb.net/test?retryWrites=true&w=majority",
	cache: new InMemoryCache()
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id="main">
					<h1>My Race Tracker</h1>
					<RunLogs />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
