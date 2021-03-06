import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./AddUser.css";

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

const addUserMutation = gql`
	mutation($name: String!, $age: String!) {
		addUser(name: $name, age: $age) {
			name
            age
		}
	}
`;

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        };
    }


    submitForm2(e) {
        e.preventDefault();
        this.props.addUserMutation({
            variables: {
                name: this.state.name,
                age: this.state.age
            },
            refetchQueries: [{ query: getUsersQuery }]
        });
    }

    render() {
        return (
            <form className="form add__user" onSubmit={this.submitForm2.bind(this)}>
                <h2 className='card__header'>Add New Runner Form</h2>
                <div className="form-group">
                    <label htmlFor="userName">Runner's Name</label>
                    <input
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        name="userName"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userAge">Age</label>
                    <input
                        type="text"
                        onChange={e => this.setState({ age: e.target.value })}
                        name="userAge"
                        className="form-control"
                    />
                </div>

                <button className='race__button'>Add Runner</button>
            </form>
        );
    }
}

export default graphql(addUserMutation, { name: "addUserMutation" })(AddUser)