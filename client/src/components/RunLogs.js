import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Logs from "./Logs/Logs";

const getRunsQuery = gql`
	{
		runs {
			type
			distance
			id
			pace
			date
			time
			notes
			user {
				name
				age
			}
		}
	}
`;

class RunLogs extends Component {
	displayRuns() {
		let data = this.props.data;
		if (data.loading) {
			return <div>Loading Runs...</div>;
		} else {
			return data.runs.map(run => {
				return (
					<Logs
						type={run.type}
						date={run.date}
						distance={run.distance}
						time={run.time}
						pace={run.pace}
						notes={run.notes}
						key={run.id}
						id={run.id}
					/>
				);
			});
		}
	}

	render() {
		return <div id="run-logs">{this.displayRuns()}</div>;
	}
}

export default graphql(getRunsQuery)(RunLogs);
