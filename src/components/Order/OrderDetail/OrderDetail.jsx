import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import './OrderDetail.css'
import axios from "axios";
import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"
import MediaQuery from 'react-responsive'

async function cancelOrder(order) {
    return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/order/cancel/' + order.orderId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //   body: JSON.stringify({
        //     id: product.productId
        //   })
    })
    // .then(data => data.json())
}

const OrderDetail = ({ order }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);
    const [price, setPrice] = useState();
    const [address, setAddress] = useState([]);
    const [orderId, setOrderId] = useState(order.orderId)
    // const [payment, setPayment] = useState([]);
    // const [noPayment , setNoPayment] = useState(0);
    const [isUpload, setIsUpload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/orderDetail/orderdetail/' + order.orderId,
            );

            const result2 = await axios(
                'https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/order/getSumPrice/' + order.orderId,
            );

            const result3 = await axios(
                'https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/address/orderAddress/' + order.addressId,
            );

            // const result4 = await axios(
            //     'https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/payment/getPayment/' + order.orderId,
            // );

            // console.log(result4)
            // setPayment(result4.data)
            setPrice(result2)
            setAddress(result3.data)
            setInfoOrder(result.data)

        };

        fetchData()

    }, []);

    useEffect(() => {
        // console.log(payment.length)
        // setNoPayment(payment.length)
    }, [infoOrder])

    const check = () => {
        // console.log(infoOrder)
    }

    const handleCancelorder = async e => {

        const response = await cancelOrder({
            orderId
        });

        setTimeout(() => {
            window.location.href = "/order";
        }, 500);

    }

    const handleUploadSlip = async e => {
        setIsUpload(true)
    }

    return (

        <div>
            <h3 style={{ textAlign: 'center' }} onClick={() => setSigntinModalShow(true)} >

                {/* {order.status === 'Order Canceled' ?
                    <h3 style={{ color: 'red' }}> {order.orderId} # {order.status}  </h3>
                    : <h3 style={{ color: 'blue' }}> {order.orderId} # {order.status}  </h3>
                } */}
                <h3 className="orderDetail" > {order.orderId} # {order.status}  </h3>

                {/* {order.orderId} # {order.status}  */}

            </h3>

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

                        {order.status === 'Order Canceled' ?
                            <h5 style={{ color: 'red' }}> Status :  {order.status} </h5>
                            : <h5> Status :  {order.status} </h5>
                        }

                        {order.status === 'Order Canceled' ?
                            null :
                            <Button variant="danger" size="sm" onClick={handleCancelorder}> Cancel Order </Button>
                        }


                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <h5> Menu </h5>
                        </Col>
                        <Col>
                            <h5>Quantity</h5>
                        </Col>
                        <Col>
                            <h5>Price</h5>
                        </Col>
                    </Row>

                    {infoOrder.map((infoOrder) => (
                        <InfoOfOrderDetail key={infoOrder.orderId} infoOrder={infoOrder} />
                    ))}

                    <Row style={{ textAlign: 'center' }} >
                        <Col>  </Col>
                        <MediaQuery minWidth={1224}>
                            <Col>  <h4 style={{ marginLeft: '3rem' }}> Total :  {order.sumPrice} </h4></Col>
                        </MediaQuery>
                        <MediaQuery maxWidth={1224}>
                            <Col>  <h5 style={{ marginLeft: '3rem' }}> Total :  {order.sumPrice} </h5></Col>
                        </MediaQuery>


                    </Row>

                    <hr></hr>

                    <MediaQuery minWidth={1224}>
                        <Row>
                            <Col >
                                <h5> Address for Shipping.</h5>
                                <h5 style={{ fontSize: '18px' }}> {address.place} </h5>
                                <h5 style={{ fontSize: '16px' }}> Reciever : {address.recieverName} </h5>
                                <h5 style={{ fontSize: '16px' }}> Reciever Tel : {address.recieverTel} </h5>
                                <h5 style={{ fontSize: '16px' }}> Address : {address.houseNumber} {address.address} {address.province} {address.postal}</h5>
                            </Col>
                            <Col>
                                <h5> Payment </h5>
                                <h5 style={{ fontSize: '16px' }}> Bank Transfer :  </h5>
                                <h5 style={{ fontSize: '18px' }}> SCB - 28232512845 - Mymom Bakery Store </h5>

                                {order.status === "Order Canceled" ?
                                    null :
                                    <Form.Group controlId="formFile" className="mb-3" hidden={order.hasPayment !== "no-slip" || isUpload}>
                                        <Form.Label> Upload your slip</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                }

                                {order.status === 'Order Canceled' ?
                                    null :
                                    <Button  onClick={handleUploadSlip} hidden={order.hasPayment !== "no-slip" || isUpload } size="sm" variant="secondary" 
                                    style={{ display: 'block', marginLeft: 'auto', marginRight: '0px' }} 
                                   
                                    > 
                                    Upload </Button>
                                }

                                {isUpload ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> You already upload your slip. Please waiting for confirmation.</h5> : null
                                }

                                {order.status === 'Waiting for Confirmation' ?
                                    <h5 style={{ fontSize: '16px', color: 'green' }}> You already upload your slip. Please waiting for confirmation.</h5> : null
                                }

                            </Col>
                        </Row>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <Row>
                            <Col >
                                <h5> Address for Shipping.</h5>
                                <h5 style={{ fontSize: '16px' }}> {address.place} </h5>
                                <h5 style={{ fontSize: '14px' }}> Reciever : {address.recieverName} </h5>
                                <h5 style={{ fontSize: '14px' }}> Reciever Tel : {address.recieverTel} </h5>
                                <h5 style={{ fontSize: '14px' }}> Address : {address.houseNumber} {address.address} {address.province} {address.postal}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5> Payment </h5>
                                <h5 style={{ fontSize: '14px' }}> Bank Transfer :  </h5>
                                <h5 style={{ fontSize: '16px' }}> SCB - 28232512845 - Mymom Bakery Store </h5>

                                {order.status === "Order Canceled" ?
                                    null :
                                    <Form.Group controlId="formFile" className="mb-3" hidden={order.hasPayment !== "no-slip" || isUpload}>
                                        <Form.Label> Upload your slip</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                }

                                {order.status === 'Order Canceled' ?
                                    null :
                                    <Button onClick={handleUploadSlip} 
                                    hidden={order.hasPayment !== "no-slip" || isUpload} size="sm" variant="secondary" 
                                    style={{ display: 'block', marginLeft: 'auto', marginRight: '0px' }}> 
                                    Upload </Button>
                                }

                                {isUpload ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> You already upload your slip. Please waiting for confirmation.</h5> : null
                                }

                                {order.status === 'Waiting for Confirmation' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> You already upload your slip. Please waiting for confirmation.</h5> : null
                                }



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
