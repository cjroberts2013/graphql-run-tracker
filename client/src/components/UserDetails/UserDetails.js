import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost'

import './UserDetails.css'

const getUserQuery = gql`
    query($id: ID) {
        user(id: $id) {
            name
            age
            id
            runs {
                type
                date
                id
                distance
                pace
                time
                notes
            }
        }
    }
`


class UserDetails extends Component {

    displayUserDetails() {
        const { user } = this.props.data
        if (user) {
            return (
                <div>
                    Name: {user.name} <br />
                    Age: {user.age} <br />
                    Races Ran:
                    <ul>
                        {
                            user.runs.map(run => {
                                return <li key={run.id}>{run.type}</li>
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return < div > Select a runner for more details!</div >
        }
    }

    render() {
        return (<div className='user__info'>
            {this.displayUserDetails()}
        </div>)
    }
}

export default graphql(getUserQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.userId
            }
        }
    }
})(UserDetails)