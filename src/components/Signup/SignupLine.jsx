import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import './Signup.css'

export default function SignupLine({ email, signinModal }) {

    return (

        <div hidden={!signinModal}>

            <Container>
                <h1 className=""> Create your Account</h1>

                <div className="signup">
                    <Form className="formSignin" >
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" value={email} />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" />
                        </Form.Group>

                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg"  >
                                Sign up
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>

        </div>

    )


}

