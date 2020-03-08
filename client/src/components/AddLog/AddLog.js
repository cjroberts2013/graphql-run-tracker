import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./AddLog.css";
import { formatError } from "graphql";

const getUsersQuery = gql`
	{
		users {
			name
			id
			age
		}
	}
`;

class AddLogs extends Component {
	constructor(props) {
		super(props);
	}

	displayUsers() {
		let data = this.props.data;
		if (data.loading) {
			return <option>Loading Runners...</option>;
		} else {
			return data.users.map(user => {
				return (
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				);
			});
		}
	}

	render() {
		return (
			<form className="form">
				<div className="form-group">
					<label htmlFor="user">Runner</label>
					<select>
						<option>Select Runner</option>
						{this.displayUsers()}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="runType">Type of Race</label>
					<input
						type="text"
						name="runType"
						className="form-control"
						placeholder="Local 5K"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runDate">Date</label>
					<input type="date" name="runDate" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="runDistance">Distance</label>
					<input
						type="number"
						name="runDistance"
						className="form-control"
						placeholder="Distance in Miles"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runPace">Pace</label>
					<input
						type="text"
						name="runPace"
						className="form-control"
						placeholder="Minutes/Mile"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runTime">Time</label>
					<input
						type="text"
						name="runTime"
						className="form-control"
						placeholder="Overall Time"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="runNote">Notes</label>
					<textarea
						type="string"
						name="runNotes"
						className="form-control"
						rows="5"
					></textarea>
				</div>

				<button>Add Race</button>
			</form>
		);
	}
}

export default graphql(getUsersQuery)(AddLogs);
