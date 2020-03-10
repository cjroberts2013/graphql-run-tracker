import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import './UserDetails.css'

const getUsersQuery = gql`
	{
		users {
			name
			id
		}
	}
`;




class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    displayUsers() {
        let data = this.props.data;
        if (data.loading) {
            return <div>Loading Runners...</div>
        } else {
            return data.users.map(user => {
                return (
                    <div>loading</div>
                )
            })
        }
    }

    render() {
        console.log(this.state.selected);
        return (
            <div className='user__details'>
                <h1>Runners</h1>
                {this.displayUsers()}
            </div>
        )
    }
}

export default graphql(getUsersQuery)(UserDetails);