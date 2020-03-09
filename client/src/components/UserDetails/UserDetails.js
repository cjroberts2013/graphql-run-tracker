import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import User from './../User/User'
import './UserDetails.css'

const getUsersQuery = gql`
	{
		users {
			name
			id
            age
            runs {
                type
                date
                distance
                pace
                time
                notes
            }
            
		}
	}
`;


class UserDetails extends Component {

    displayUsers() {
        let data = this.props.data;
        if (data.loading) {
            return <div>Loading Runners...</div>
        } else {
            return data.users.map(user => {
                return (
                    <User
                        key={user.id}
                        name={user.name}
                        age={user.age}
                        id={user.id}
                        runs={user.runs}
                        type={user.runs.type}
                        date={user.runs.date}
                        distance={user.runs.distance}
                        time={user.runs.time}
                        pace={user.runs.pace}
                        notes={user.runs.notes}
                        runId={user.runs.id} />
                )
            })
        }
    }

    render() {
        return (
            <div className='user__details'>
                {this.displayUsers()}
            </div>
        )
    }
}

export default graphql(getUsersQuery)(UserDetails);