import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'
import Users from '../../components/users'

export class UserPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <h2>List of Users</h2>
                    <Users />
                </Container>
            </div>

        )
    }
}

export default UserPage
