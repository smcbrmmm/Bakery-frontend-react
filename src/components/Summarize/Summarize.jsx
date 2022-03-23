import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col } from "react-bootstrap";
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

    useEffect(() => {
        console.log(value)


        const fetchData = async () => {
            const result = await axios(
                'https://cf31-2405-9800-b600-6272-1023-5056-cc19-5c83.ngrok.io/api/order/getOrderByDate/' + value,
            );
            console.log(result)
            setOrder(result.data)

        };

        fetchData();


    }, [])


    const handleChange = (newValue) => {
        setValue(newValue);

        const date = moment(newValue).format('YYYY-MM-DD');

        const fetchData = async () => {
            const result = await axios(
                'https://cf31-2405-9800-b600-6272-1023-5056-cc19-5c83.ngrok.io/api/order/getOrderByDate/' + date,
            );
            console.log(result)
            setOrder(result.data)

        };

        fetchData();



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
                            inputFormat="MM/dd/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />
                            } />
                    </LocalizationProvider>
                </div>

                {order.length > 0 ?
                    <TableContainer component={Paper} sx={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }} >
                        <Table sx={{ minWidth: 650 }} style={{ textAlign: 'center' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">User ID</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.map((order) => (

                                    <OrderSummarize key={order.orderId} order={order} />

                                            // <TableRow
                                            //     key={order.orderId}
                                            //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            // >
                                            //     <TableCell component="th" scope="row">
                                            //         {order.orderId}
                                            //     </TableCell>
                                            //     <TableCell align="right">{order.userId}</TableCell>
                                            //     <TableCell align="right">{order.status}</TableCell>
                                            //     <TableCell align="right">{order.date}</TableCell>
                                            // </TableRow>
                                        ))}
                        </TableBody>
                    </Table>
                            </TableContainer>


            : <h2 style={{ textAlign: 'center', marginTop: '2rem' }}> No order in this day.</h2>
                }



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

