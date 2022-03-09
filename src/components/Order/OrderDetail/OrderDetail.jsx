import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import './OrderDetail.css'
import axios from "axios";
import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"

const OrderDetail = ({ order }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://e226-2405-9800-b600-698c-6999-9220-373e-e462.ngrok.io/api/orderDetail/orderdetail/' + order.orderId,
            );
            setInfoOrder(result.data)
        };

        fetchData()

    }, []);

    const check = () => {
        console.log(infoOrder)
    }

    return (

        <div>
            <h3 className="orderDetail" style={{ textAlign: 'center' }} onClick={() => setSigntinModalShow(true)} > {order.orderId} # {order.status} </h3>



            <Modal className="cart-modal" show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your order information.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {infoOrder.map((infoOrder) => (
                         <InfoOfOrderDetail key={infoOrder.orderId} infoOrder={infoOrder} /> 
                    ))}
                    {/* <Button onClick={check}> Click </Button> */}
                </Modal.Body>
            </Modal>




        </div>

    );
};



export default OrderDetail;
