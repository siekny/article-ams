import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { userLogout } from '../constants/Storage';

export class LogoutPage extends Component {
    render() {
        userLogout();

        return (
            <div>
                <Redirect to='/login' />
            </div >
        )
    }
}

export default LogoutPage
