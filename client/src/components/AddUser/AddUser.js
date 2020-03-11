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
            age: ''
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
            <form className="form" onSubmit={this.submitForm2.bind(this)}>
                <div className="form-group">
                    <label htmlFor="userName">Runner's Name</label>
                    <input
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        name="userName"
                        className="form-control"
                        placeholder="John Doe..."
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

                <button>Add Runner</button>
            </form>
        );
    }
}

export default graphql(addUserMutation, { name: "addUserMutation" })(AddUser)