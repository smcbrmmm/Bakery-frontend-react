import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import OrderDetail from './OrderDetail/OrderDetail'

import { connect } from "react-redux";

import {
    setProductInCart,
    setProductList
} from "../../redux/Shopping/shopping-actions";

// const Orders = ({ setProductInCart }) =>
const Orders = ({ products, setProductList, setProductInCart }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [order, setOrder] = useState([]);
    const [inCart, setInCart] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/order/order',
            );

            fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/cart/inCart/' + user.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => data.json())
                .then(data => setProductInCart(data))

            setOrder(result.data)
        };

        fetchData()

    }, []);


    const [open, setOpen] = useState(true);
    const [showOrderDetail, setShowOrderDetail] = useState(true);

    return (
        <div className="page-container">
            <NavbarCom />

            {/* <Button onClick={() => console.log(order)}> but  </Button> */}


            <div className='content-wrap'>
                <Container>
                    <h1 className="main" style={{ textAlign: 'center' }}>  Order Status </h1>

                    <Row>
                        <Col>
                            <h3 className="main" style={{ textAlign: 'center' }}>  History </h3>

                        </Col>
                        <Col>
                            <h3 className="main" style={{ textAlign: 'left' }}>  Order Detail </h3>

                            {order.map((order) => (
                                user.id === order.userId ?
                                    <OrderDetail key={order.orderId} order={order} />
                                    : null
                            ))}
                        </Col>
                    </Row>





                </Container>

            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        products: state.shop.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProductList: data => dispatch(setProductList(data)),
        setProductInCart: data => dispatch(setProductInCart(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);

