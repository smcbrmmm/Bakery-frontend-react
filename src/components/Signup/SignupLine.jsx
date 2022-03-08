import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'


export default function SignupLine( {email}) {
    
    return (
        <div className="page-container">
            <NavbarCom />

            <div className='content-wrap'>
                
                Line
                {email}

            </div>
        </div>
    )


}

