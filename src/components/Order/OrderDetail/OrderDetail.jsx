import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import './OrderDetail.css'
import axios from "axios";
import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"
import MediaQuery from 'react-responsive'
import moment from 'moment';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

async function cancelOrder(order) {
    return fetch(' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/cancel/' + order.orderId, {
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

async function updateOrder(order) {

    console.log(order)

    return fetch(' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/payment/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: order.orderId, userId: order.userId, paymentSlip: order.postImage.myFile
        })
    })
    // .then(data => data.json())
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OrderDetail = ({ order, hid }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);
    const [price, setPrice] = useState();
    const [address, setAddress] = useState([]);
    const [orderId, setOrderId] = useState(order.orderId)
    // const [payment, setPayment] = useState([]);
    // const [noPayment , setNoPayment] = useState(0);
    const [isUpload, setIsUpload] = useState(false);
    const [status, setStatus] = useState(order.status)
    const [userId, setUserId] = useState(user.id)
    const [paymentSlip, setPaymentSlip] = useState("samut");
    const [files, setFile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                ' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/orderDetail/orderdetail/' + order.orderId,
            );

            const result2 = await axios(
                ' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/getSumPrice/' + order.orderId,
            );

            const result3 = await axios(
                ' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/address/orderAddress/' + order.addressId,
            );

            // const result4 = await axios(
            //     ' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/payment/getPayment/' + order.orderId,
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

    const handleClick = () => {
        setOpenAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleUploadSlip = async e => {
        setIsUpload(true)
        setStatus("Waiting for Confirmation")

        const response = await updateOrder({
            orderId, userId, postImage
        });
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const [postImage, setPostImage] = useState({
        myFile: "",
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64 });
        console.log(postImage.myFile.length)

    };

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let allfiles = []

        // I've kept this example simple by using the first image instead of multiple
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
        }
        if (allfiles.length > 0) {
            setFile(allfiles);
        }

    }

    useEffect(() => {
        console.log(postImage)
    }, [postImage])

    const handleClickTracking = () => {
        window.location.href = "https://track.thailandpost.co.th/";
    }

    const [modalShowDelete, setModalShowDelete] = useState(false);

    const [openAlert, setOpenAlert] = React.useState(false);


    return (

        <div>

            <h3 style={{ textAlign: 'left' }} onClick={() => setSigntinModalShow(true)} >

                {/* {order.status === 'Order Canceled' ?
                    <h3 style={{ color: 'red' }}> {order.orderId} # {order.status}  </h3>
                    : <h3 style={{ color: 'blue' }}> {order.orderId} # {order.status}  </h3>
                } */}
                {/* <h3 className="orderDetail" > {order.orderId} # {status}  </h3> */}

                {hid === 'All' ?
                    order.status === 'Order Canceled' ?
                        <a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'red' }} >  {order.orderId} - {status}  </h4> </a> : null
                    : null
                }

                {hid === 'All' ?
                    order.status === 'Waiting for Confirmation'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'green' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'All' ?
                    order.status === 'Success'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'green' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'All' ?
                    order.status === 'Confirm , Waiting for shipment'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'orange' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'All' ?
                    order.status === 'Shipping'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'black' }} >  {order.orderId} - {status} - {order.trackingNo} </h4> </a>) : null
                    : null
                }

                {hid === 'All' ?
                    order.status === 'Waiting for payment'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'blue' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'Cancel' ?
                    order.status === 'Order Canceled' ?
                        <a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'red' }} >  {order.orderId} - {status}  </h4> </a> : null
                    : null
                }

                {hid === 'In Process Order' ?
                    order.status === 'Waiting for Confirmation'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'green' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'In Process Order' ?
                    order.status === 'Confirm , Waiting for shipment'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'orange' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'In Process Order' ?
                    order.status === 'Waiting for payment'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'blue' }} >  {order.orderId} - {status}  </h4> </a>) : null
                    : null
                }

                {hid === 'In Process Order' ?
                    order.status === 'Shipping'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'violet' }} >  {order.orderId} - {status} - <a className="trackingNo" onClick={handleClickTracking}>{order.trackingNo}</a>  </h4> </a>) : null
                    : null
                }

                {hid === 'Success Order' ?
                    order.status === 'Success'
                        ? (<a href="#" className="cat-menu"><h4 className="orderDetail" style={{ color: 'green' }} >  {order.orderId} - {status} </h4> </a>) : null
                    : null
                }


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
                            : null
                        }

                        {order.status === 'Waiting for payment' ?
                            <h5 style={{ color: 'blue' }}> Status :  {order.status} </h5>
                            : null
                        }

                        {order.status === 'Confirm , Waiting for shipment' ?
                            <h5 style={{ color: 'orange' }}> Status :  {order.status} </h5>
                            : null
                        }

                        {order.status === 'Shipping' ?
                            <h5 style={{ color: 'black' }}> Status :  {order.status} - <a className="trackingNo" onClick={handleClickTracking}>{order.trackingNo}</a> </h5>
                            : null
                        }

                        {order.status === 'Success' ?
                            <h5 style={{ color: 'green' }}> Status :  {order.status} </h5>
                            : null
                        }

                        <h5 style={{ color: 'grey', fontSize: '16px' }}> Date :  {moment(order.date.slice(0, 10)).format("D MMMM YYYY")} </h5>

                        {order.status === 'Order Canceled' ?
                            null :
                            <Button hidden={order.hasPayment !== "no-slip" || isUpload || order.status === 'Confirm , Waiting for shipment'
                                || order.status === 'Shipping' || order.status === 'Success'
                            } variant="danger" size="sm" onClick={() => { setModalShowDelete(true) }}> Cancel Order </Button>
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
                            <h5>Price (Baht)</h5>
                        </Col>
                    </Row>

                    {infoOrder.map((infoOrder) => (
                        <InfoOfOrderDetail key={infoOrder.orderId} infoOrder={infoOrder} />
                    ))}

                    <Row style={{ textAlign: 'center' }} >
                        <Col>  </Col>
                        <MediaQuery minWidth={1224}>
                            <Col>  <h4 style={{ marginLeft: '3rem' }}> Total :  {order.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </h4></Col>
                        </MediaQuery>
                        <MediaQuery maxWidth={1224}>
                            <Col>  <h5 style={{ marginLeft: '3rem' }}> Total :  {order.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </h5></Col>
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
                                    <Form.Group controlId="formFile" className="mb-3" hidden={order.hasPayment !== "no-slip" || isUpload
                                        || order.status === 'Confirm , Waiting for shipment' || order.status === 'Shipping' || order.status === 'Success'}>
                                        <Form.Label> Upload your slip</Form.Label>
                                        <Form.Control type="file" onChange={(e) => { handleFileUpload(e); onSelectFile(e) }} />
                                    </Form.Group>
                                }

                                {order.status === 'Order Canceled' ?
                                    <h5 style={{ fontSize: '16px', color: 'red' }}> Your order has been canceled.</h5> :
                                    <Button onClick={handleUploadSlip} hidden={order.hasPayment !== "no-slip" || isUpload
                                        || order.status === 'Confirm , Waiting for shipment' || order.status === 'Shipping' || order.status === 'Success'} size="sm" variant="secondary"
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

                                {order.status === 'Confirm , Waiting for shipment' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> Order has been confirmed. Waiting for shipping.</h5> : null
                                }

                                {order.status === 'Shipping' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> Order has been shiping.</h5> : null
                                }

                                {order.status === 'Success' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> Order has been successed.</h5> : null
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
                                    <Form.Group controlId="formFile" className="mb-3" hidden={order.hasPayment !== "no-slip" || isUpload
                                        || order.status === 'Confirm , Waiting for shipment' || order.status === 'Shipping' || order.status === 'Success'
                                    }>
                                        <Form.Label> Upload your slip</Form.Label>
                                        <Form.Control type="file" onChange={(e) => { handleFileUpload(e); onSelectFile(e) }} />
                                    </Form.Group>
                                }

                                {order.status === 'Order Canceled' ?
                                    <h5 style={{ fontSize: '14px', color: 'red' }}> Your order has been canceled.</h5> :
                                    <Button onClick={handleUploadSlip}
                                        hidden={order.hasPayment !== "no-slip" || isUpload
                                            || order.status === 'Confirm , Waiting for shipment' || order.status === 'Shipping' || order.status === 'Success'
                                        } size="sm" variant="secondary"
                                        style={{ display: 'block', marginLeft: 'auto', marginRight: '0px' }}

                                    >
                                        Upload </Button>
                                }

                                {isUpload ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> You already upload your slip. Please waiting for confirmation.</h5> : null
                                }

                                {order.status === 'Waiting for Confirmation' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> You already upload your slip. Please waiting for confirmation.</h5> : null
                                }

                                {order.status === 'Confirm , Waiting for shipment' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> Order has been confirmed. Waiting for shipping.</h5> : null
                                }

                                {order.status === 'Shipping' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> Order has been shiping.</h5> : null
                                }

                                {order.status === 'Success' ?
                                    <h5 style={{ fontSize: '14px', color: 'green' }}> Order has been successed.</h5> : null
                                }





                            </Col>
                        </Row>
                    </MediaQuery>


                    {/* <Button onClick={check}> Click </Button> */}
                </Modal.Body>
            </Modal>

            <Modal className="cart-modal" show={modalShowDelete}
                onHide={() => setModalShowDelete(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Cancel order confirmation.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> Cancel this order Now !!! </h5>

                    <Button variant='danger' style={{ display: 'block', marginLeft: 'auto' }}
                        onClick={() => { handleCancelorder() }}
                    > Confirm</Button>
                </Modal.Body>
            </Modal>

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="danger" sx={{ width: '100%' }}>
                    Order already canceled.
                </Alert>
            </Snackbar>

        </div>

    );
}


export default OrderDetail;
