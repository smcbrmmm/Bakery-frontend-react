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
import OrderSummarize from "../Summarize/OrderSummarize/OrderSummarize";
import ReportSummarize from "../Report/ReportSummarize/ReportSummarize"
import SearchIcon from '@mui/icons-material/Search';
const Report = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [value1, setValue1] = React.useState(moment().format('YYYY-MM-DD'));
    const [value2, setValue2] = React.useState(moment().format('YYYY-MM-DD'));
    const [dateTo, setDateTo] = React.useState(moment().format('YYYY-MM-DD'));
    const [dateFrom, setDateFrom] = React.useState(moment().format('YYYY-MM-DD'));
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState();

    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(true);


    const handleClick = () => {

        setShowLoading(false)

        const fetchData = async () => {
            const result = await axios(
                'https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/order/getOrderForReport/' + dateTo + "/" + dateFrom ,
            );

            const result2 = await axios(
                'https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/order/getTotalPrice/' + dateTo + "/" + dateFrom ,
            );

            console.log(result)
            console.log(result2)
            setOrder(result.data)
            setTotal(result2.data)
            setLoading(true)

        };

        fetchData();
        setLoading(false)


    }


    const handleChangeDateTo = (newValue) => {

        setValue1(newValue)
        const dateTo = moment(newValue).format('YYYY-MM-DD');
        setDateTo(dateTo)
    };


    const handleChangeDateFrom = (newValue) => {

        setValue2(newValue)
        const dateFrom = moment(newValue).format('YYYY-MM-DD');
        setDateFrom(dateFrom)
    };

    return (
        <div className="page-container">
            <NavbarCom />

            <div className='container'>
                {/* <h1 className="main" style={{ textAlign: 'center' }}>  Report </h1> */}

                <h1 className="main" style={{ textAlign: 'center' }}>  Report Sales </h1>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Row>
                        <Col sm={5} style={{ textAlign: 'right' , marginRight : '-4rem' , marginLeft:'4rem' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="From"
                                    inputFormat="dd/MM/yyyy"
                                    value={value1}
                                    onChange={handleChangeDateTo}
                                    renderInput={(params) => <TextField {...params} />
                                    } />
                            </LocalizationProvider>
                        </Col>
                        <Col sm={2}>
                            <div style={{marginTop : '1rem'}}>
                                <h5 style={{ display: 'inline' }}> To  </h5>
                            </div>
                        </Col>
                        <Col sm={5} style={{ textAlign: 'left' , marginLeft:'-4rem' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="To"
                                    inputFormat="dd/MM/yyyy"
                                    value={value2}
                                    onChange={handleChangeDateFrom}
                                    minDate={value1}
                                    renderInput={(params) => <TextField {...params} />
                                    } />
                            </LocalizationProvider>
                        </Col>
                    </Row>





                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                    <Button onClick={handleClick}> <SearchIcon></SearchIcon> </Button>
                </div>

                {loading ?

                    order.length > 0 ?
                        <TableContainer component={Paper} sx={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '3rem' }} >
                            <Table sx={{ minWidth: 650 }} style={{ textAlign: 'center' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell align="right">Customer ID</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Price (Baht)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.map((order) => (

                                        <ReportSummarize key={order.orderId} order={order} />


                                    ))}
                                    <TableRow>
                                        <TableCell rowSpan={5} />
                                        <TableCell colSpan={3} align="right" > Total</TableCell>
                                        <TableCell align="right"> {(total + "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>


                        : <h2 style={{ textAlign: 'center', marginTop: '2rem' }}> No Report</h2>

                    :
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Spinner animation="border" role="status" hidden={showLoading}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }


                {/* {order.length > 0 ?


                    <TableContainer component={Paper} sx={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '3rem' }} >
                        <Table sx={{ minWidth: 650 }} style={{ textAlign: 'center' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">Customer ID</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Price (Baht)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.map((order) => (

                                    <ReportSummarize key={order.orderId} order={order} />


                                ))}
                                <TableRow>
                                    <TableCell rowSpan={5} />
                                    <TableCell colSpan={3} align="right" > Total</TableCell>
                                    <TableCell align="right"> {(total + "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>


                    : <h2 style={{ textAlign: 'center', marginTop: '2rem' }}> No Report</h2>
                } */}

                {/* <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> */}



            </div>
        </div >
    )

}

export default connect()(Report);

