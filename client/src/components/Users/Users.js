import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import UserDetails from './../UserDetails/UserDetails';
import AddUser from './../AddUser/AddUser'
import './Users.css';

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




class Users extends Component {
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
                    <li id='user__elements' key={user.id}><button onClick={(e) => { this.setState({ selected: user.id }) }}>{user.name}</button></li>
                )
            })
        }
    }

    render() {
        return (
            <div className='user__details'>
                <h1>Runners</h1>
                <ul className='user__names'>
                    {this.displayUsers()}
                </ul>
                <UserDetails userId={this.state.selected} />
                <AddUser />
            </div>
        )
    }
}

export default graphql(getUsersQuery)(Users);