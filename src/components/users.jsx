import React, { Component } from 'react';

class users extends Component {
    componentDidMount() {

    }
    render() {
        // const { users } = this.props.users
        // console.log('users', this.props.users)

        return (
            <div>
                {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr>
                                    <td>{user.userId}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdDate}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table> */}
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({ users: state.users })

export default users