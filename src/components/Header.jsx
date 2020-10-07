import React, { Component } from 'react';
import { Card, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { getUserStorage } from '../constants/Storage';
import cardImage from './../assets/image/default.jpg';

class Header extends Component {
    render() {
        const user = getUserStorage();
        console.log('user', user);
        return (
            <Navbar bg="light" expand="lg" className="shadow p-3 mb-5 bg-white">
                <Container>
                    <Navbar.Brand>អត្ថបទ​ព័ត៌មាន</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Form inline>
                            <Nav.Link href="/user" className="float-left">អ្នកប្រើប្រាស់</Nav.Link>
                            <Nav.Link href="/category" className="float-left">ប្រភេទអត្ថបទ</Nav.Link>
                            <Nav.Link href="/article">អត្ថបទ</Nav.Link>
                            <Card.Img variant="top" src={user?.userProfile !== null ? user?.userProfile : cardImage} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                            <NavDropdown title={user?.userName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
