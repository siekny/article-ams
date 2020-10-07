import React, { Component } from 'react';
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import './login.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/UserActions';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            error: ''
        };


    }
    componentDidMount() {

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username } = this.state;

        // stop here if form is invalid
        if (!(username)) {
            return;
        }

        this.props.onLogin(username);
    }

    render() {
        const { username } = this.state;
        const { loading, isAuthenticated } = this.props;
        if (localStorage.getItem('loginEmail') != null || isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <Container className="login-container">
                <h2 className="text-center title">Welcome to React Course</h2>
                <Card className="loginCard">
                    <Card.Body className="py-5 px-5">
                        <Form className="container mx-auto" onSubmit={this.handleSubmit} name="form">
                            <Form.Group as={Row} className={'d-flex justify-content-center form-group' + (!username ? ' has-error' : '')} >
                                <Col sm="12">
                                    <Form.Control
                                        className="textField"
                                        name="username"
                                        placeholder="username"
                                        type="text"
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <div className="text-center mt-4">
                                <button className="btn btn-primary loginButton w-100" block="true">
                                    Login
                                </button>
                                {loading &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt='login' />
                                }
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <h6 className="text-center my-4 title">{new Date().getFullYear()} © React Course. All right reserved.</h6>
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        loading: state.user.loading,
        isAuthenticated: state.user.loginEmail != null
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLogin: (username) => dispatch(login(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
