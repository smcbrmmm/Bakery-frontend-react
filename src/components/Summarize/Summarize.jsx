import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Spinner } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { connect } from "react-redux";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
// const Orders = ({ setProductInCart }) =>
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import moment from 'moment';
import OrderSummarize from "./OrderSummarize/OrderSummarize";

const Summarize = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [value, setValue] = React.useState(moment().format('YYYY-MM-DD'));
    const [date, setDate] = React.useState();
    const [order, setOrder] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        console.log(value)

        setShowLoading(false)

        const fetchData = async () => {
            const result = await axios(
                'https://83b2-2405-9800-b600-6272-154b-d1ba-1f0e-3a84.ngrok.io/api/order/getOrderByDate/' + value,
            );
            console.log(result)
            setOrder(result.data)
            setLoading(true)
        };

        fetchData();
        setLoading(false)

    }, [])


    const handleChange = (newValue) => {
        setValue(newValue);
        setShowLoading(false)

        const date = moment(newValue).format('YYYY-MM-DD');

        const fetchData = async () => {
            const result = await axios(
                'https://83b2-2405-9800-b600-6272-154b-d1ba-1f0e-3a84.ngrok.io/api/order/getOrderByDate/' + date,
            );
            console.log(result)

            setOrder(result.data)
            setLoading(true)
        };

        fetchData();
        setLoading(false)


    };

    return (
        <div className="page-container">
            <NavbarCom />

            <div className='container'>
                <h1 className="main" style={{ textAlign: 'center' }}>  Order Check </h1>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date Picker"
                            inputFormat="dd/MM/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />
                            } />
                    </LocalizationProvider>

                </div>

                {loading ?
                    order.length > 0 ?
                        <TableContainer component={Paper} sx={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }} >
                            <Table sx={{ minWidth: 650 }} style={{ textAlign: 'center' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell align="right">Customer ID</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.map((order) => (
                                        <OrderSummarize key={order.orderId} order={order} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        : <h2 style={{ textAlign: 'center', marginTop: '2rem' }}> No order in this day.</h2>
                    :
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Spinner animation="border" role="status" hidden={showLoading}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>}





            </div>


        </div >
    )

}

// const mapStateToProps = (state) => {
//     return {
//         products: state.shop.products,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         setProductList: data => dispatch(setProductList(data)),
//         setProductInCart: data => dispatch(setProductInCart(data))
//     }
// }

const SummarizeConnect = connect()(Summarize);

export default connect()(Summarize);

