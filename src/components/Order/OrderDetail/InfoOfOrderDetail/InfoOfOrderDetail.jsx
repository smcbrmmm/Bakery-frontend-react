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




export default function InfoOfOrderDetail({infoOrder}) {


    return (
        <div className="main">

            <h1> {infoOrder.title}</h1>
            <br></br>


        </div>
    );
}