import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import './OrderDetail.css'
import axios from "axios";
import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"

const OrderDetail = ({ order }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);
    const [price, setPrice] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/orderDetail/orderdetail/' + order.orderId,
            );

            const result2 = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/order/getSumPrice/' + order.orderId,
            );

            setInfoOrder(result.data)
            setPrice(result2)

        };

        fetchData()

    }, []);

    useEffect(() => {

    }, [infoOrder])

    const check = () => {
        // console.log(infoOrder)
    }

    return (

        <div>
            <h3 className="orderDetail" style={{ textAlign: 'center' }} onClick={() => setSigntinModalShow(true)} > {order.orderId} # {order.status} </h3>

            <Modal className="cart-modal" show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your order information.  #{order.orderId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={9}>
                            {infoOrder.map((infoOrder) => (
                                <InfoOfOrderDetail key={infoOrder.orderId} infoOrder={infoOrder} />
                            ))}
                        </Col>
                        <Col sm={3}>
                            <h4> {order.sumPrice}</h4>
                        </Col>
                    </Row>


                    {/* <Button onClick={check}> Click </Button> */}
                </Modal.Body>
            </Modal>

        </div>

    );
}



export default OrderDetail;
