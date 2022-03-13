import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { connect } from "react-redux";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
// const Orders = ({ setProductInCart }) =>

import moment from 'moment';

const Summarize = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [value, setValue] = React.useState(new Date());
    const [date , setDate] = React.useState();

    const handleChange = (newValue) => {
        setValue(newValue);
        // console.log(typeof newValue)

        const date = moment(newValue).format('YYYY-MM-DD-HH-mm-ss');
        setDate(date)
        console.log(date)
        // const myArray = newValue.split(" ");
        // console.log(myArray)


    };

    return (
        <div className="page-container">
            <NavbarCom />

            <div className='container'>
                <h1 className="main" style={{ textAlign: 'center' }}>  Order Check </h1>
                <div style={{textAlign:'center' , marginTop :'2rem'}}>
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
            </div>


        </div>
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

