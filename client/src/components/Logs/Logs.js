import React, { Component } from "react";
import "./Logs.css";

class Logs extends Component {
	constructor(props) {
		super(props);
		this.id = props.id;
		this.date = props.date;
		this.time = props.time;
		this.type = props.type;
		this.pace = props.pace;
		this.distance = props.distance;
		this.notes = props.notes;
	}
	render(props) {
		return (
			<div className="card">
				<div className='card__header'>
					<h2 className='block'>
						{this.type}: <span>{this.date}</span>
					</h2>
					<h3>
						Runner: <span>{this.props.name}</span>
					</h3>
				</div>
				<div className="card__details">
					<div className="card__details--left">
						Distance: <span>{this.distance}</span> <br />
						Time: <span>{this.time}</span> <br />
						Pace: <span>{this.pace}</span>
					</div>
					<div className="card__details--right">
						Notes <br />
						<span>{this.notes}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Logs;
