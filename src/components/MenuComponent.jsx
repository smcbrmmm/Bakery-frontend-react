import React, { Component, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import NavbarCom from './NavbarComponent'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import axios from "axios";

export default function MenuComponent() {

    const [pastry, setPastry] = useState(false);
    const [roastedPastry, setRoastedPastry] = useState(true);
    const [riceCracker, setRiceCracker] = useState(true);

    const [menu, setPastryMenu] = useState({ pastry: [] , roasted : [] , riceCracker : [] })
    // const [roastedPastrMenu, setPastryMenu] = useState([])
    // const [riceCrackerMenu, setPastryMenu] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              'http://localhost:8090/api/products/allProducts',
            );
            setPastryMenu({
              pastry: result.data,
              roasted : result.data,
              riceCracker : result.data
            });
          };
      
          fetchData();
    }, [])

    const categoryFilter = (category) => {
        setPastry(true)
        setRoastedPastry(true)
        setRiceCracker(true)
        if (category == "pastry") {
            setPastry(false)
        }
        else if (category == "roastedPastry") {
            setRoastedPastry(false)
        }
        else if (category == "riceCracker") {
            setRiceCracker(false)
        }
    }

    return (
        <div className="App">
            <NavbarCom />
            <Container>
                <h1 className="main" style={{ textAlign: 'center' }}>  Mymom Bakery's Menu </h1>
            </Container>

            <Container style={{ marginTop: '4rem' }}>
                <Row>
                    <Col sm={3}>
                        <h2 className="main" style={{ marginBottom: '2rem' }}>  Category </h2>
                        <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("pastry")} >  Chinese Pastry </h5></a>
                        <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("roastedPastry")}>  Roasted Chinese Pastry </h5></a>
                        <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("riceCracker")}>  Rice Cracker </h5></a>
                    </Col>
                    <Col sm={9}>
                        <h2 className="main" style={{ textAlign: 'center', marginBottom: '2rem' }} >  Product </h2>
                        <Row hidden={pastry} style={{ marginBottom: '1rem' }}>
                            {menu.pastry.map((data, id) => {
                                return <Col className="cardMenu" key={id}>
                                    <Card style={{ width: '18rem', display: 'flex' }}>
                                        <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                            src={data.img} />
                                        <Card.Body>
                                            <Card.Title>{data.name}</Card.Title>
                                            <Card.Text>
                                            </Card.Text>
                                            <h5 style={{ fontSize: '18px' }}> {data.price} Baht.</h5>
                                            <Button variant="primary">Add to Cart.</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                        <Row hidden={roastedPastry} style={{ marginBottom: '1rem' }}>
                            <Col className="cardMenu">
                                <Card style={{ width: '18rem', display: 'flex' }}>
                                    <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                        src="https://www.mychineserecipes.com/wp-content/uploads/2020/06/Egg-Yolk-Lotus-Paste-Pastry-Recipe.jpg" />
                                    <Card.Body>
                                        <Card.Title>Roasted 1 Chinese Pastry</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <h5 style={{ fontSize: '18px' }}> 30 Baht </h5>
                                        <Button variant="primary">Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="cardMenu">
                                <Card style={{ width: '18rem', display: 'flex' }}>
                                    <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                        src="https://images.squarespace-cdn.com/content/v1/5f7997e193946d25441c1809/1614927105687-6P27MKEC755CF6ZECBRJ/durian+pastry.jpg" />
                                    <Card.Body>
                                        <Card.Title>Roasted 2 Chinese Pastry</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <h5 style={{ fontSize: '18px' }}> 30 Baht </h5>
                                        <Button variant="primary">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="cardMenu">
                                <Card style={{ width: '18rem', display: 'flex' }}>
                                    <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                        src="https://live.staticflickr.com/65535/51446236924_56e46b5a79_b.jpg" />
                                    <Card.Body>
                                        <Card.Title>Roasted 3 Chinese Pastry</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <h5 style={{ fontSize: '18px' }}> 30 Baht </h5>
                                        <Button variant="primary">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row hidden={riceCracker} style={{ marginBottom: '1rem' }}>
                            <Col className="cardMenu">
                                <Card style={{ width: '18rem', display: 'flex' }}>
                                    <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                        src="https://www.mychineserecipes.com/wp-content/uploads/2020/06/Egg-Yolk-Lotus-Paste-Pastry-Recipe.jpg" />
                                    <Card.Body>
                                        <Card.Title>Rice Cracker 1</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <h5 style={{ fontSize: '18px' }}> 30 Baht </h5>
                                        <Button variant="primary">Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="cardMenu">
                                <Card style={{ width: '18rem', display: 'flex' }}>
                                    <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                        src="https://images.squarespace-cdn.com/content/v1/5f7997e193946d25441c1809/1614927105687-6P27MKEC755CF6ZECBRJ/durian+pastry.jpg" />
                                    <Card.Body>
                                        <Card.Title>Rice Cracker 2</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <h5 style={{ fontSize: '18px' }}> 30 Baht </h5>
                                        <Button variant="primary">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="cardMenu">
                                <Card style={{ width: '18rem', display: 'flex' }}>
                                    <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                                        src="https://live.staticflickr.com/65535/51446236924_56e46b5a79_b.jpg" />
                                    <Card.Body>
                                        <Card.Title>Rice Cracker 3</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        <h5 style={{ fontSize: '18px' }}> 30 Baht </h5>
                                        <Button variant="primary">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>
    )


}

