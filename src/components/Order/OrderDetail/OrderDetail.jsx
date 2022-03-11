import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import './OrderDetail.css'
import axios from "axios";
import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"
import MediaQuery from 'react-responsive'


const OrderDetail = ({ order }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);
    const [price, setPrice] = useState();
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/orderDetail/orderdetail/' + order.orderId,
            );

            const result2 = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/order/getSumPrice/' + order.orderId,
            );

            const result3 = await axios(
                'https://9fb4-2405-9800-b600-ae29-3127-e7ab-3721-f252.ngrok.io/api/address/orderAddress/' + order.addressId,
            );

            console.log(result3)

            setPrice(result2)
            setAddress(result3.data)
            setInfoOrder(result.data)

        };

        fetchData()

    }, []);

    useEffect(() => {
        console.log(address)
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
            // dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your order information.  #{order.orderId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <h3> Menu </h3>
                        </Col>
                        <Col>
                            <h3>Quantity</h3>
                        </Col>
                        <Col>
                            <h3>Price</h3>
                        </Col>
                    </Row>

                    {infoOrder.map((infoOrder) => (
                        <InfoOfOrderDetail key={infoOrder.orderId} infoOrder={infoOrder} />
                    ))}

                    <Row style={{ textAlign: 'center' }} >
                        <Col>  </Col>
                        <Col>  <h4 style={{ marginLeft: '3rem' }}> Total :  {order.sumPrice} </h4></Col>
                    </Row>

                    <MediaQuery minWidth={1224}>
                        <Row>
                            <Col >
                                <h5> Address for Shipping.</h5>
                                <h5 style={{ fontSize:'16px' }}> {address.place} </h5>
                            </Col>
                            <Col>
                                <h5> Payment </h5>
                            </Col>
                        </Row>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <Row>
                            <Col >
                                <h5> Address for Shipping.</h5>
                                <h4 style={{ fontSize:'16px' }}> {address.place} </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5> Payment </h5>
                            </Col>
                        </Row>
                    </MediaQuery>


                    {/* <Button onClick={check}> Click </Button> */}
                </Modal.Body>
            </Modal>

        </div>

    );
}


export default OrderDetail;
