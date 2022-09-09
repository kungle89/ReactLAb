import React from 'react';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


const NavigationMenu = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Movies On The Tip</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/moviescoming" as={NavLink}>Coming Soon</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;