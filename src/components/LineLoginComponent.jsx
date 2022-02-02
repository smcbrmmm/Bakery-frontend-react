import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade } from "react-bootstrap";

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

const liff = window.liff

class LineLoginComponent extends React.Component {


  constructor(props) {
    super(props);

    const name = "samuy";

    this.state = {
      name: '',
      userLineID: '',
      pictureUrl: '',
      statusMessage: '',
      email: '',
      idToken: ''
    };
  }

  componentDidMount = async () => {
    await liff.init({ liffId: '1656735773-AvMkVePR' })
      .catch(err => { throw err });
    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      let getDecodedIDToken = await liff.getDecodedIDToken();
      let getAccessToken = await liff.getAccessToken();
      this.name = "samut";
      this.setState({
        name: getProfile.displayName,
        userLineID: getProfile.userId,
        pictureUrl: getProfile.pictureUrl,
        statusMessage: getProfile.statusMessage,
        email: getDecodedIDToken.email,
        idToken: getAccessToken
      });
    }
    else {
      liff.login();
    }
  }

  render() {

    return (
      <div className="App">

        <Navbar bg="light">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }, { marginLeft: '5rem' }}
            navbarScroll>
            <Navbar.Brand href="#home">
              <Link to='/' className="linkTo"><h2 className="main" style={{ textAlign: 'center' }}>  Mymom Bakery </h2></Link>
            </Navbar.Brand>
          </Nav>
          <Nav className="main" style={{ maxHeight: '100px' }, { marginRight: '5rem' }}>
            <Nav.Link href="/login">  <h4>Home</h4>  </Nav.Link>
            <Nav.Link href="/menu">  <h4>Menu</h4> </Nav.Link>
            <Nav.Link href="#action3">  <h4>Contact Us</h4> </Nav.Link>
            <Nav.Link href="/login">  <h4><img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-sign-in-interface-dreamstale-lineal-dreamstale.png"></img>Sign in</h4>  </Nav.Link>
          </Nav>
        </Navbar>


        <header className="App-header">
          <div className="support">
            <p>ชื่อ {this.state.name}</p>
            <p>Line ID {this.state.userLineID}</p>
            <img alt='pic' src={this.state.pictureUrl} />
            <p>Email {this.state.email}</p>
            <p>Id Token {this.state.idToken}</p>
          </div>

          <Button> logout </Button>
        </header>
      </div>
    )
  }

}


export default LineLoginComponent;
