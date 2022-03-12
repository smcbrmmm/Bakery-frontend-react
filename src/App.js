import React, { useState, useEffect } from 'react';
import './Style/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer'
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Row, Col, Card } from "react-bootstrap";
import NavbarCom from './components/Navbar/NavbarComponent'
import MediaQuery from 'react-responsive'
// Redux
import { connect } from "react-redux";

import {
  setProductList
} from "./redux/Shopping/shopping-actions";

function App({ setProductList }) {
  const token = localStorage.getItem('accessToken');

  const cors = require('cors');


  return (
    <div className="page-container">
      <div className='content-wrap'>
        <NavbarCom />
        <Container>
          <h1 hidden="true" className="main" style={{ textAlign: 'center' }}>  Mymom Bakery </h1>
          
          <MediaQuery minWidth={1224}>
            <Carousel className="carousel-home"
              style={{ width: '70%', height: '40%', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%' }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                  alt="First slide"
                  style={{ width: '400px', height: '500px' }}
                />
                <Carousel.Caption>
                  <h3 className="carousel-text">Mymom bakery I</h3>
                  <p className="carousel-text" ></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                  alt="Second slide"
                  style={{ width: '400px', height: '500px' }}
                />
                <Carousel.Caption>
                  <h3 className="carousel-text" >Mymom bakery II</h3>
                  <p className="carousel-text" ></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                  alt="Third slide"
                  style={{ width: '400px' , height: '500px' }}
                />

                <Carousel.Caption>
                  <h3 className="carousel-text">Mymom bakery III</h3>
                  <p className="carousel-text"></p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </MediaQuery>

          <MediaQuery maxWidth={1224}>
            <Carousel className="carousel-home"
              style={{  maxWidth : '100%' , maxHeight : '30%', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%' }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                  alt="First slide"
                  style={{ maxWidth : '100%' , margin: "0 0" }}
                />
                <Carousel.Caption>
                  <h3 className="carousel-text">Mymom bakery I</h3>
                  <p className="carousel-text" ></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                  alt="Second slide"
                  style={{ maxWidth : '90%' }}
                />
                <Carousel.Caption>
                  <h3 className="carousel-text" >Mymom bakery II</h3>
                  <p className="carousel-text" ></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                  alt="Third slide"
                  style={{ maxWidth : '90%' }}/>

                <Carousel.Caption>
                  <h3 className="carousel-text">Mymom bakery III</h3>
                  <p className="carousel-text"></p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </MediaQuery>

        </Container>

      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setProductList: data => dispatch(setProductList(data))
  }
}

export default connect(null, mapDispatchToProps)(App)