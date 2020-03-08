import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getRunsQuery = gql`
	{
		runs {
			type
			distance
			id
			pace
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
					<li key={run.id}>
						{run.type} {run.distance}
					</li>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<ul id="run-logs">{this.displayRuns()}</ul>
			</div>
		);
	}
}

export default graphql(getRunsQuery)(RunLogs);
