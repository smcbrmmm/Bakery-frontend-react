import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Nav, NavDropdown, Collapse, Modal, Fade, Button } from "react-bootstrap";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




export default function InfoOfOrderDetail({ infoOrder }) {

    const [price, setPrice] = useState();

    return (

        <Row style={{textAlign:'center'}}>
            <Col>
                <img src={infoOrder.img} width="40%" />
                <h5> {infoOrder.title}</h5>
            </Col>
            <Col>
                <h5> {infoOrder.productQty}  </h5>
            </Col>
            <Col>
                <h5> {infoOrder.productPrice * infoOrder.productQty}  </h5>
            </Col>
        </Row>


    );
}