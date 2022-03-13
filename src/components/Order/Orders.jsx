import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import OrderDetail from './OrderDetail/OrderDetail'
import MediaQuery from 'react-responsive'
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

    const categoryFilter = (category) => {

        if (category == "All") {
            console.log("All")
        }
        else if (category == "Cancel") {
            console.log("Cancel")
        }
        else if (category == "InProcessOrder"){
            console.log("InProcessOrder")
        }
        else if (category == "SuccessOrder"){
            console.log("SuccessOrder")
        }
    }


    const [category , setCategory] = useState("All");
    const [open, setOpen] = useState(true);
    const [showOrderDetail, setShowOrderDetail] = useState(true);

    return (
        <div className="page-container">
            <NavbarCom />

            {/* <Button onClick={() => console.log(order)}> but  </Button> */}


            <div className='content-wrap'>
                <Container>
                    <h1 className="main" style={{ textAlign: 'Left' }}>  Order Status </h1>

                    <MediaQuery minWidth={1224}>
                        <Row>
                            <Col sm={4}>
                                <h3 className="main" style={{ textAlign: 'Left' , marginTop : '2rem' , marginBottom : '2rem'}}>  History </h3>
                                <a href="#" className="cat-menu"><h4  style={{ textAlign: 'Left' }} onClick={() => setCategory("All")}>  All Order </h4></a>
                                <a href="#" className="cat-menu"><h4 style={{ textAlign: 'Left'  }} onClick={() => setCategory("Cancel")}>  Cancel Order </h4></a>
                                <a href="#" className="cat-menu"><h4  style={{ textAlign: 'Left'  }} onClick={() => setCategory("All")}>  In Process Order </h4></a>
                                <a href="#" className="cat-menu"><h4  style={{ textAlign: 'Left'  }} onClick={() => setCategory("All")}>  Success Order </h4></a>
                            </Col>
                            <Col sm={8}>
                                <h3 className="main" style={{ textAlign: 'left' , marginTop : '2rem' , marginBottom : '2rem' }}>  History Detail </h3>

                                {order.map((order) => (
                                    user.id === order.userId ?
                                        <OrderDetail key={order.orderId} order={order}  />
                                        : null
                                ))}
                            </Col>
                        </Row>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <Row>
                            <h3 className="main" style={{ textAlign: 'center' }}>  History </h3>
                        </Row>

                        <hr></hr>

                        <Row>
                            <h3 className="main" style={{ textAlign: 'center' }}>  Order Detail </h3>

                            {order.map((order) => (
                                user.id === order.userId ?
                                    <OrderDetail key={order.orderId} order={order} />
                                    : null
                            ))}
                        </Row>
                    </MediaQuery>







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

