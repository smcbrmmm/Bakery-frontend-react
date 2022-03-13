import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import './Footer.css'

const Footer = () => {

    if (1 == 1) {
        console.log("samut")
    }

    return (
        <div className="App">
            <div className="main-footer" bg='dark'>
                <div className="container">
                    <Row>
                        <Col>
                            <Container>
                                <h3 style={{ textAlign: 'center' }}> Contract Us </h3>
                                <h5 style={{ textAlign: 'center', marginBottom: '3rem' }}> Contact number : 0922489093 </h5>

                                <h5 style={{ textAlign: 'center' }}> Social Media </h5>
                                <div style={{ textAlign: 'center' }}>
                                    <img src="https://img.icons8.com/color/64/000000/facebook-new.png" />
                                    <img src="https://img.icons8.com/color/64/000000/line-me.png" />
                                    <img src="https://img.icons8.com/fluency/64/000000/instagram-new.png" />
                                </div>
                            </Container>
                        </Col>
                        <Col>
                            <h3 style={{ textAlign: 'center' }}> Help </h3>
                            <h5 style={{ textAlign: 'center', marginBottom: '3rem' }}>  - Contract us  </h5>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};


export default Footer;