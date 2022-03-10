import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import OrderDetail from './OrderDetail/OrderDetail'

export default function Orders() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [order, setOrder] = useState([]);
    const [inCart , setInCart] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/order/order',
            );

            const result2 = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/cart/inCart/'+ user.id,
            );
            
            console.log(result2.data)

            setInCart(result2.data)
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

                            <h3 className="main" style={{ textAlign: 'center' }}>  Order Detail </h3>

                            {order.map((order) => (
                                user.id === order.userId ?
                                    <OrderDetail key={order.orderId} order={order} /> 
                                    : null
                            ))}

                            
                </Container>

            </div>
        </div>
    )


}

