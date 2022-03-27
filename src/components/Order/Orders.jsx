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

    if (!user) {
        window.location.href = "/lineloginmobile";
    }

    const [order, setOrder] = useState([]);
    const [inCart, setInCart] = useState();
    const [sizeOfOrder, setSizeOfOrder] = useState(0);

    var size = 0;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://ed13-2405-9800-b600-6272-128-35b3-4634-6a19.ngrok.io/api/order/order',
            );

            fetch('https://ed13-2405-9800-b600-6272-128-35b3-4634-6a19.ngrok.io/api/cart/inCart/' + user.id, {
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




    useEffect(() => {
        for (var i = 0; i < order.length; i++) {
            // if(order[i].userId === user.id){
            //     size++;
            // }
            if (order[i].userId === user.id) {
                console.log(order[i].userId)
            }

        }
        console.log(size)
    }, [order])

    const categoryFilter = (category) => {

        if (category == "All") {
            console.log("All")
        }
        else if (category == "Cancel") {
            console.log("Cancel")
        }
        else if (category == "InProcessOrder") {
            console.log("InProcessOrder")
        }
        else if (category == "SuccessOrder") {
            console.log("SuccessOrder")
        }
    }


    const [all, setAll] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [open, setOpen] = useState(true);
    const [showOrderDetail, setShowOrderDetail] = useState(true);
    const [category, setCategory] = useState("All");

    return (
        <div className="page-container">
            <NavbarCom />

            {/* <Button onClick={() => console.log(order)}> but  </Button> */}


            <div className='content-wrap'>
                <Container>
                    <MediaQuery minWidth={1224}>
                        <h1 className="main" style={{ textAlign: 'Left' }}>  Order Status </h1>
                        <Row>
                            <Col sm={4}>
                                <h2 className="main" style={{ textAlign: 'Left', marginTop: '2rem', marginBottom: '2rem' }}>  History </h2>
                                <a href="#" className="cat-menu"><h4 style={{ textAlign: 'Left' }} onClick={() => setCategory("All")}>  All Order </h4></a>
                                <a href="#" className="cat-menu"><h4 style={{ textAlign: 'Left' }} onClick={() => setCategory("Cancel")}>  Cancel Order </h4></a>
                                <a href="#" className="cat-menu"><h4 style={{ textAlign: 'Left' }} onClick={() => setCategory("In Process Order")}>  In Process Order </h4></a>
                                <a href="#" className="cat-menu"><h4 style={{ textAlign: 'Left' }} onClick={() => setCategory("Success Order")}>  Success Order </h4></a>
                            </Col>
                            <Col sm={8}>
                                <h2 className="main" style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '2rem' }}>  History Detail </h2>

                                {size === 0 ?
                                    <h2 style={{textAlign:'center'}}> You don't have order.</h2>
                                    :
                                    order.map((order) => (
                                        user.id === order.userId ?
                                            (<OrderDetail key={order.orderId} order={order} hid={category} />)
                                            : null
                                    ))
                                }
                            </Col>
                        </Row>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <h1 className="main" style={{ textAlign: 'center' }}>  Order Status </h1>
                        <Row>
                            {/* <h3 className="main" style={{ textAlign: 'center' }}>  History </h3> */}
                        </Row>

                        <Row>

                            {size === 0 ?
                                <h2 style={{textAlign:'center'}}> You don't have order.</h2>
                                :
                                order.map((order) => (
                                    user.id === order.userId ?
                                        (<OrderDetail key={order.orderId} order={order} hid={category} />)
                                        : null
                                ))
                            }

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

