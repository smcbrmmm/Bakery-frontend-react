import React, { useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";


const OrderDetail = ({ order }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        
            <tr>
                <td> {order.orderId}</td>
                <td> # </td>
                <td>{order.status}</td>
            </tr>
        
    );
};



export default OrderDetail;
