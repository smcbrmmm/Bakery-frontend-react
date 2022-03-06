import React, { useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";


const OrderDetail = ({ order }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [infoOrder, setInfoOrder] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'http://localhost:8090/api/order/order',
    //         );

    //         setInfoOrder(result.data)
    //     };

    //     fetchData()

    // }, []);

    return (

        <div>
            <h3 style={{textAlign:'center'}}> {order.orderId} # {order.status} </h3>
        </div>

    );
};



export default OrderDetail;
