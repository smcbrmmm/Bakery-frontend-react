import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Row, Col, Card } from "react-bootstrap";
import NavbarCom from './NavbarComponent'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'


class HomeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }

    render() {

        return (
            <div className="App">

                <NavbarCom />
                <Container>
                    <h1 hidden="true" className="main" style={{ textAlign: 'center' }}>  Mymom Bakery </h1>

                    <Carousel className="carousel-home"
                        style={{ width: '80%', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src='https://www.wildgrainsbakery.com/wp-content/uploads/2020/08/Untitled-18.jpg'
                                alt="First slide"
                                style={{ width: '400px' }, { height: '500px' }}
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
                                style={{ width: '400px' }, { height: '500px' }}
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
                                style={{ width: '400px' }, { height: '500px' }}
                            />

                            <Carousel.Caption>
                                <h3 className="carousel-text">Mymom bakery III</h3>
                                <p className="carousel-text"></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>




                <Container >
                    <h1 className="recommendText"> Menu Recommended </h1>
                    <Row>
                        <Col className="cardMenu">
                            <Card style={{ width: '18rem', display: 'flex' }}>
                                <Card.Img variant="top" style={{ width: '287px', height: '280px' }}
                                    src="https://www.mychineserecipes.com/wp-content/uploads/2020/06/Egg-Yolk-Lotus-Paste-Pastry-Recipe.jpg" />
                                <Card.Body>
                                    <Card.Title>Salted Egg Pastry</Card.Title>
                                    <Card.Text>  
                                    </Card.Text>
                                    <h5 style={{fontSize:'18px'}}> 30 Baht </h5>
                                    <Button  hidden="true" variant="primary">Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="cardMenu">
                            <Card style={{ width: '18rem', display: 'flex' }}>
                                <Card.Img variant="top" style={{ width: '287px', height: '280px' }}
                                    src="https://images.squarespace-cdn.com/content/v1/5f7997e193946d25441c1809/1614927105687-6P27MKEC755CF6ZECBRJ/durian+pastry.jpg" />
                                <Card.Body>
                                    <Card.Title>Durian Pastry</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <h5 style={{fontSize:'18px'}}> 30 Baht </h5>
                                    <Button  hidden="true" variant="primary">Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="cardMenu">
                            <Card style={{ width: '18rem', display: 'flex' }}>
                                <Card.Img variant="top" style={{ width: '287px', height: '280px' }}
                                    src="https://live.staticflickr.com/65535/51446236924_56e46b5a79_b.jpg" />
                                <Card.Body>
                                    <Card.Title>Taro Pastry</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <h5 style={{fontSize:'18px'}}> 30 Baht </h5>
                                    <Button  hidden="true" variant="primary">Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="cardMenu">
                            <Card style={{ width: '18rem', display: 'flex' }}>
                                <Card.Img variant="top" style={{ width: '287px', height: '280px' }}
                                    src="https://food-fanatic-res.cloudinary.com/iu/s--S_S_HTSQ--/c_thumb,f_auto,g_auto,h_1200,q_auto,w_1200/v1518565759/banana-nutella-puff-pastry-cups-photo" />
                                <Card.Body>
                                    <Card.Title>Banana Pastry</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    <h5 style={{fontSize:'18px'}}> 30 Baht </h5>
                                    <Button hidden="true" variant="primary">Add to Cart</Button>
                      
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Container></Container>
            </div>
        )
    }

}

export default HomeComponent;
