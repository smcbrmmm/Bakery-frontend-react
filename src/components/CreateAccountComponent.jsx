import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade , Modal} from "react-bootstrap";
import NavbarCom from './NavbarComponent'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import axios from "axios";

export default function CreateAccountComponent(props) {

    const createAccount = (() => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        axios.post('http://localhost:8090/api/users/signup', {
            email: 'samut.c@ku.th',
            password: 'Flintstone'
        }, { headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    return (
        <div className="App">

             <Container>
                <h1 className="main" style={{ textAlign: 'center' }}>  Sign up </h1>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form className="formSignUp">
                            <Form.Group className="signupInput mb-3" controlId="formBasicName" >
                                <Form.Label>Firstname - Lastname</Form.Label>
                                <Form.Control type="text" placeholder="First name - Last name" />
                            </Form.Group>

                            <Form.Group className="signupInput mb-3" controlId="formBasicTel" >
                                <Form.Label>Tel</Form.Label>
                                <Form.Control type="tel" placeholder="Telephone number." />
                            </Form.Group>

                            <Form.Group className="signupInput mb-3" controlId="formBasicEmail" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="signupInput mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="signupInput mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>

            /* <button onClick={createAccount}> click me</button> */


        </div>
    )


}


