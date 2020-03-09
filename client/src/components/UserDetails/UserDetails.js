import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import './UserDetails.css'

const getUsersQuery = gql`
	{
		users {
			name
			id
            age
            
		}
	}
`;


class UserDetails extends Component {


    render() {
        return (
            <div className='user__details'>
                user details
            </div>
        )
    }
}

export default graphql(getUsersQuery)(UserDetails);