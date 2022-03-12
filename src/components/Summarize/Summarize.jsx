import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import { connect } from "react-redux";

// const Orders = ({ setProductInCart }) =>
const Summarize = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    
    return (
        <div className="page-container">
            <NavbarCom />

            {/* <Button onClick={() => console.log(order)}> but  </Button> */}


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

