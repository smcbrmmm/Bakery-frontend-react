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
                                    <h5 style={{ textAlign: 'center' }}> Contact number : 0922489093
                                    
                                     </h5>
                                    <h5 style={{ textAlign: 'center', marginBottom: '3rem' }}> K.Nares </h5>

                                    <h5 style={{ textAlign: 'center' }}> Social Media </h5>
                                    <div style={{ textAlign: 'center' }}>
                                        <a href="https://www.facebook.com/mixzimize.kub"> <img src="https://img.icons8.com/color/64/000000/facebook-new.png" /> </a>
                                        <a href="https://line.me/R/ti/p/@516qpnpw"><img src="https://img.icons8.com/color/64/000000/line-me.png" /></a>
                                        <a href="https://www.instagram.com/mix_chattarin/"><img src="https://img.icons8.com/fluency/64/000000/instagram-new.png" /></a>
                                    </div>
                                </Container>


                                {/* <h3 style={{ textAlign: 'center' }}> Help </h3>
                                <h5 style={{ textAlign: 'center', marginBottom: '3rem' }}>   Contract us  </h5> */}

                        </MediaQuery>
                        <MediaQuery maxWidth={1224}>
                        <h3 style={{ textAlign: 'center' , fontSize:'15px' , marginTop:'0.5rem' }}> Social Media: </h3>

                            <div style={{textAlign : 'center'}}>
                            <a href="https://www.facebook.com/mixzimize.kub"><img  src="https://img.icons8.com/color/64/000000/facebook-new.png" style={{maxWidth:'20%' }} /></a>
                            <a href="https://line.me/R/ti/p/@516qpnpw"><img  src="https://img.icons8.com/color/64/000000/line-me.png" style={{maxWidth:'20%' }} /></a>
                            <a href="https://www.instagram.com/mix_chattarin/"><img  src="https://img.icons8.com/fluency/64/000000/instagram-new.png" style={{maxWidth:'20%'}} /></a>
                            </div>
                        </MediaQuery>

                    </Row>
                </div>
            </div>
        </div>
    );
};


export default Footer;