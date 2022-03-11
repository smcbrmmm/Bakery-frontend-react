import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import GoogleMapReact from 'google-map-react';

// Redux
import { connect } from "react-redux";
import MediaQuery from 'react-responsive'

const AnyReactComponent = ({ text }) => <div>{text}
    <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-pin-maps-navigation-kmg-design-flat-kmg-design-1.png">
    </img></div>;


const ContactUsComponent = () => {

    return (
        <div className="page-container">

            <NavbarCom />
            <div className="content-wrap">
                <h1 className="main" style={{ textAlign: 'center' }}>  Contact us </h1>

                <MediaQuery minWidth={1224}>
                    <Container style={{ height: '500px', width: '600px' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyBnEaWzZ7b4BVzDtSiIuJLx2iK6-CH75Yw', language: 'en' }}
                            defaultCenter={{ lat: 13.816659689024158, lng: 100.05297262248749 }}
                            defaultZoom={17}>
                            <AnyReactComponent
                                lat={13.8172596890244}
                                lng={100.0527726224849}
                                text="MyMom Bakery"
                            />
                        </GoogleMapReact>
                    </Container>
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                    <Container style={{ height: '200px', width: '300px' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyBnEaWzZ7b4BVzDtSiIuJLx2iK6-CH75Yw', language: 'en' }}
                            defaultCenter={{ lat: 13.816659689024158, lng: 100.05297262248749 }}
                            defaultZoom={17}>
                            <AnyReactComponent
                                lat={13.8172596890244}
                                lng={100.0527726224849}
                                text="MyMom Bakery"
                            />
                        </GoogleMapReact>
                    </Container>
                </MediaQuery>


            </div>

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    };
};

export default connect(mapStateToProps)(ContactUsComponent);


