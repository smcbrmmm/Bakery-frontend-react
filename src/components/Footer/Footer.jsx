import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import './Footer.css'
import MediaQuery from 'react-responsive'


const Footer = () => {


    return (
        <div className="App">
            <div className="main-footer" bg='dark'>
                <div className="container">
                    <Row>

                        <MediaQuery minWidth={1224}>
                            
                                <Container>
                                    <h3 style={{ textAlign: 'center' }}> Contract Us </h3>
                                    <h5 style={{ textAlign: 'center', marginBottom: '3rem' }}> Contact number : 0922489093 </h5>

                                    <h5 style={{ textAlign: 'center' }}> Social Media </h5>
                                    <div style={{ textAlign: 'center' }}>
                                        <a href="https://www.canva.com/"> <img src="https://img.icons8.com/color/64/000000/facebook-new.png" /> </a>
                                        <a href="https://www.canva.com/"><img src="https://img.icons8.com/color/64/000000/line-me.png" /></a>
                                        <a href="https://www.canva.com/"><img src="https://img.icons8.com/fluency/64/000000/instagram-new.png" /></a>
                                    </div>
                                </Container>


                                {/* <h3 style={{ textAlign: 'center' }}> Help </h3>
                                <h5 style={{ textAlign: 'center', marginBottom: '3rem' }}>   Contract us  </h5> */}

                        </MediaQuery>
                        <MediaQuery maxWidth={1224}>
                        <h3 style={{ textAlign: 'Left' , fontSize:'15px' }}> Social Media: </h3>
                            <img src="https://img.icons8.com/color/64/000000/facebook-new.png" style={{maxWidth:'20%' , marginRight:'-2rem'}} />
                            <img src="https://img.icons8.com/color/64/000000/line-me.png" style={{maxWidth:'20%' , marginRight:'-2rem'}} />
                            <img src="https://img.icons8.com/fluency/64/000000/instagram-new.png" style={{maxWidth:'20%'}} />
                        </MediaQuery>

                    </Row>
                </div>
            </div>
        </div>
    );
};


export default Footer;