import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./AddLog.css";
import * as compose from "lodash.flowright";

const getUsersQuery = gql`
	{
		users {
			name
			id
			age
            runs {
                type
                date
            }
		}
	}
`;

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

const addRaceMutation = gql`
	mutation( $type: String!, $date: String!, $distance: String!, $pace: String!, $time: String!, $notes: String!, $userId: String!) {
		addRun( type: $type, date: $date, distance: $distance, pace: $pace, time: $time, notes: $notes, userId: $userId) {
			type
			distance
		}
	}
`;

class AddLogs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			type: "",
			date: "",
			distance: null,
			pace: "",
			time: "",
			notes: ""
		};
	}

	displayUsers() {
		let data = this.props.getUsersQuery;
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

	submitForm(e) {
		e.preventDefault();
		this.props.addRaceMutation({
			variables: {
				userId: this.state.userId,
				type: this.state.type,
				date: this.state.date,
				distance: this.state.distance,
				pace: this.state.pace,
				time: this.state.time,
				notes: this.state.notes
			},
			refetchQueries: [{ query: getRunsQuery, getUsersQuery }]
		});
	};

	render() {
		return (
			<form className="form" onSubmit={this.submitForm.bind(this)}>
				<h2 className='card__header'>Add New Race Form</h2>
				<div className="form-group">
					<label htmlFor="user">Runner</label>
					<select onChange={e => this.setState({ userId: e.target.value })}>
						<option>Select Runner</option>
						{this.displayUsers()}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="runType">Type of Race</label>
					<input
						onChange={e => this.setState({ type: e.target.value })}
						type="text"
						name="runType"
						className="form-control"
						placeholder="Local 5K"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runDate">Date</label>
					<input
						type="date"
						onChange={e => this.setState({ date: e.target.value })}
						name="runDate"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runDistance">Distance</label>
					<input
						type="text"
						onChange={e => this.setState({ distance: e.target.value })}
						name="runDistance"
						className="form-control"
						placeholder="Distance in Miles"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runPace">Pace</label>
					<input
						type="text"
						onChange={e => this.setState({ pace: e.target.value })}
						name="runPace"
						className="form-control"
						placeholder="Minutes/Mile"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="runTime">Time</label>
					<input
						type="text"
						onChange={e => this.setState({ time: e.target.value })}
						name="runTime"
						className="form-control"
						placeholder="Overall Time"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="runNote">Notes</label>
					<textarea
						type="string"
						onChange={e => this.setState({ notes: e.target.value })}
						name="runNotes"
						className="form-control"
						rows="5"
					></textarea>
				</div>

				<button className='race__button'>ADD RACE</button>
			</form>
		);
	}
}

export default compose(
	graphql(getUsersQuery, { name: "getUsersQuery" }),
	graphql(addRaceMutation, { name: "addRaceMutation" })
)(AddLogs);
