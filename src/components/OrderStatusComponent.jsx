import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from './NavbarComponent'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'


class MenuComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            showOrderDetail: true
        };
    }

    showOrderDetail = () => {
        this.setState({ showOrderDetail: !this.state.showOrderDetail })
    }

    render() {

        return (
            <div className="MenuComponent">
                <NavbarCom />
                <Container>
                    <h1 className="main" style={{ textAlign: 'center' }}>  Order Status </h1>
                    <Row>
                        <Col>
                            <h3 className="main" style={{ textAlign: 'center' }}>  Order Detail </h3>
                            <Table striped bordered hover className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order#</th>
                                        <th>Date/Time</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>15234</td>
                                        <td>22/1/2022 - 13:54</td>
                                        <td onClick={this.showOrderDetail}> Waiting for payment.</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <div hidden={this.state.showOrderDetail}>
                                <h3 className="main" style={{ textAlign: 'left', marginLeft: '2rem' }}> Order  <Button  variant="danger" size="sm"> Cancel </Button> </h3>
                                <Row>
                                    <Col>
                                        <h3 className="order-detail" > Menu </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="order-detail" > Quantity </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="order-detail" > Price (Baht)</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span>
                                            <h3 className="order-detail" > Taro Pastry </h3>
                                            <img src="https://live.staticflickr.com/65535/51446236924_56e46b5a79_b.jpg" alt="" style={{ width: '160px', height: '110px', marginLeft: '2rem' }} />
                                        </span>
                                    </Col>
                                    <Col>
                                        <h3 className="order-detail" > 1 </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="order-detail" > 30 </h3>
                                    </Col>
                                </Row>
                                <Row className="order">
                                    <Col>
                                        <span>
                                            <h3 className="order-detail" > Banana Pastry </h3>
                                            <img src="https://food-fanatic-res.cloudinary.com/iu/s--S_S_HTSQ--/c_thumb,f_auto,g_auto,h_1200,q_auto,w_1200/v1518565759/banana-nutella-puff-pastry-cups-photo" alt=""
                                                style={{ width: '160px', height: '110px', marginLeft: '2rem' }} />
                                        </span>
                                    </Col>
                                    <Col>
                                        <h3 className="order-detail" > 2 </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="order-detail" > 80 </h3>
                                    </Col>
                                </Row>
                                <Row className="order">
                                    <Col>
                                    </Col>
                                    <Col>
                                    </Col>
                                    <Col>
                                        <Row>
                                        <Col>
                                        <h1 className="order-detail" style={{textAlign:'left'}} > Total  </h1>
                                        <h1 className="order-detail" style={{textAlign:'left'}} > Shipping  </h1>
                                        <h1 className="order-detail" style={{textAlign:'left'}} > Sum  </h1>
                                        </Col>
                                        <Col>
                                        <h1 className="order-detail" style={{textAlign:'right'}} > 110  </h1>
                                        <h1 className="order-detail" style={{textAlign:'right'}} > 40  </h1>
                                        <h1 className="order-detail" style={{textAlign:'right'}} > 150  </h1>
                                        </Col>
                                        <Col>
                                        </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr />
                                <div style={{ textAlign: 'left', marginLeft: '2rem' }}>
                                    <h3 className="main" > Payment </h3>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload your slip</Form.Label>
                                        <Form.Control type="file" style={{ width: '70%' }} />
                                        <Button size="sm"> Upload </Button>
                                    </Form.Group>
                                   
                                </div>


                                <h3 className="main" style={{ textAlign: 'left', marginLeft: '2rem' }}> Tracking </h3>


                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default MenuComponent;
