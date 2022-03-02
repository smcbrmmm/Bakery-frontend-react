import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import './Footer.css'

const Footer = () => {
    return (
        <div className="App">
            <div className="main-footer">
                <div className="container">
                    <Row>
                        <Col>
                            <h3 style={{ textAlign: 'right' }}> Contract Us </h3>
                        </Col>
                        <Col>
                            <h3 style={{ textAlign: 'left' }}> Tel </h3>
                            <h3 style={{ textAlign: 'left' }}> Tel </h3>
                            <h3 style={{ textAlign: 'left' }}> Tel </h3>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};


export default Footer;