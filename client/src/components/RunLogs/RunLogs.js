import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Logs from "../Logs/Logs";
import AddLog from "./../AddLog/AddLog";
import Users from './../Users/Users'
import "./RunLogs.css";

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
						name={run.user.name}
					/>
				);
			});
		}
	}

	render() {
		return (
			<div className="run__logs">
				<div className="run__logs--left">
					<h1>Race Logs</h1>
					{this.displayRuns()}
					<div>
						{/* RunLog Form to add new runs. Use a function to display either a button or the form */}
						<AddLog />
					</div>
				</div>
				<div className="run__logs--right">
					{/* display all the possible runners along with a create runner button */}
					<Users />
				</div>
			</div>
		);
	}
}

export default graphql(getRunsQuery)(RunLogs);
