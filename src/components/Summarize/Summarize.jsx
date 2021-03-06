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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import moment from 'moment';
import OrderSummarize from "./OrderSummarize/OrderSummarize";
import SearchIcon from '@mui/icons-material/Search';

const Summarize = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [value, setValue] = React.useState(moment().format('YYYY-MM-DD'));
    const [date, setDate] = React.useState();
    const [order, setOrder] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    const [avSearch, setAvSearch] = useState(false);
    const [searchOrderId, setSearchOrderId] = useState("");

    useEffect(() => {
        
        setShowLoading(false)

        const fetchData = async () => {
            const result = await axios(
                'https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/order/getOrderByDate/' + value,
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
        setSearchOrderId("")

        const fetchData = async () => {
            const result = await axios(
                'https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/order/getOrderByDate/' + date,
            );
            console.log(result)

            setOrder(result.data)
            setLoading(true)
        };

        fetchData();
        setLoading(false)


    };

    const ClickSearch = () => {
        setAvSearch(!avSearch)
        setSearchOrderId("")
    }


    const ClickSearchForm = () => {
        setShowLoading(false)

        const date = moment(value).format('YYYY-MM-DD');
        
        if(searchOrderId.length === 0) {
            const fetchData = async () => {
                const result = await axios(
                    'https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/order/getOrderByDate/' + date,
                );
                console.log(result)
    
                setOrder(result.data)
                setLoading(true)
            };
    
            fetchData();
        }else {
            const fetchData = async () => {
                const result = await axios(
                    'https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/order/getOrderByDateAndOrderId/' + date + "/" + searchOrderId,
                );
                console.log(result)
                setOrder(result.data)
                setLoading(true)
            };
    
            fetchData();
        }

    setLoading(false)
    }

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
                <div style={{ textAlign: 'center', marginLeft: '9rem' }}>
                    <a className="av-search">
                        <h5 style={{ fontSize: '14px', marginTop: '2px' }} onClick={ClickSearch}> Advance Search </h5>
                    </a>
                </div>

                <div>
                    {avSearch ?

                        <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' , marginBottom:'1rem' }}>
                        <div class="custom-search" style={{ width: '19%' }}>
                            <input type="text" class="custom-search-input" value={searchOrderId} onChange={e => setSearchOrderId(e.target.value)} placeholder="Search OrderId"></input>
                                <button class="custom-search-botton" onClick={ClickSearchForm} > <SearchIcon></SearchIcon> </button>
                        </div>
                        </div>
                        : null}

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

const SummarizeConnect = connect()(Summarize);

export default connect()(Summarize);

