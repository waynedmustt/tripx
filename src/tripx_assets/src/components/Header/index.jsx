import React from 'react';
import {
    Container,
    Row,
    Col
  } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

const Header = () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col className="text-center">
                    <Link to="/">Home</Link>
                </Col>
                <Col className="text-center">
                    <Link to="/login">Login</Link>
                </Col>
                <Col className="text-center">
                    <Link to="/mint">Mint</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;