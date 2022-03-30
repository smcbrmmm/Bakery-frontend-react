import React, { Component , useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import GoogleMapReact from 'google-map-react';
import './ContractUs.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

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


                <Container>
                    <div style={{ textAlign: 'center' }}>
                        {/* <h4  style={{fontSize:'30px'}}> Mymom </h4> */}
                        {/* <h4 className="main"  style={{fontSize:'26pxpx'}}> LOCATION </h4> */}
                        <br></br>
                        <br></br>
                        <h4 className="thai-font" style={{ fontSize: '24px' }}> อยู่ด้านใน บี.เอ็น คาร์แคร์ </h4>
                        <h4 className="thai-font" style={{ fontSize: '24px' }}> 132/10 ถ.ราชวิถี ต.พระปฐมเจดีย์ อ.เมือง จ.นครปฐม </h4>
                        <br></br>
                        <h4 className="main" style={{ fontSize: '24px' }}> <LocalPhoneIcon></LocalPhoneIcon> Tel : 081-8330125  </h4>
                        <h4 className="main" style={{ fontSize: '22px' , marginTop : '-0.7rem' }}> K. Nares  </h4>

                        <h4 className="main" style={{ fontSize: '22px' , marginTop : '0.5rem' }}> <img style={{marginTop : '-0.5rem' , width : '4%'}} 
                        src="https://img.icons8.com/color/64/000000/line-me.png" /> Line: @516qpnpw </h4>

                        <a href="https://www.canva.com/"><img style={{marginTop : '-0.5rem' , width : '20%'}} 
                        src="https://www.img.in.th/images/29ac19727d16702ffbf4c567040235ad.jpg" /> 
                    
                        </a>

                        <hr></hr>
                        <h4 className="main" style={{ fontSize: '25px' , marginTop : '1rem' }}> Map   </h4>
                        
                    </div>
                </Container>

                <MediaQuery minWidth={1224}>
                    <Container style={{ height: '500px', width: '600px' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyBnEaWzZ7b4BVzDtSiIuJLx2iK6-CH75Yw', language: 'en' }}
                            defaultCenter={{ lat: 13.816659689024158, lng: 100.05297262248749 }}
                            defaultZoom={19}
                            
                            >
                            <AnyReactComponent
                                lat={13.8168493890244}
                                lng={100.0529027224849}
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


