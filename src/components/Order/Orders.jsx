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

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://7daf-2405-9800-b600-698c-5cad-e267-7f49-51f7.ngrok.io/api/order/order',
            );

            setOrder(result.data)
        };

        fetchData()

    }, []);


    const [open, setOpen] = useState(true);
    const [showOrderDetail, setShowOrderDetail] = useState(true);

    const onClick= () => {
        console.log(order)
        console.log(user.id)
    }



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

                <Button onClick={onClick}> order </Button>
            </div>
        </div>
    )


}

