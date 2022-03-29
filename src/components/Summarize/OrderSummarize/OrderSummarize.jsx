import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import MediaQuery from 'react-responsive'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import InfoOfOrderDetail from "../../Order/OrderDetail/InfoOfOrderDetail/InfoOfOrderDetail";
import moment from 'moment';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function cancelOrder(order) {
    return fetch(' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/cancel/' + order.orderId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

async function updateStatusConfirm(order) {
    return fetch(' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/update/status/confirm/' + order.orderId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

async function updateStatusShipping(order) {
    return fetch(' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/update/status/shipping/' + order.orderId + "/" + order.trackingNo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


async function updateStatusSuccess(order) {
    return fetch(' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/update/status/success/' + order.orderId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const OrderSummarize = ({ order }) => {

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
    const [userId, setUserId] = useState(user ? user.id : "100")
    const [paymentSlip, setPaymentSlip] = useState("samut");
    const [files, setFile] = useState([]);
    const [price2, setPrice2] = useState(order.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                ' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/orderDetail/orderdetail/' + order.orderId,
            );

            const result2 = await axios(
                ' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/getSumPrice/' + order.orderId,
            );

            const result3 = await axios(
                ' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/address/orderAddress/' + order.addressId,
            );

            // const result4 = await axios(
            //     ' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/payment/getPayment/' + order.orderId,
            // );

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

    const handleCancelorder = async e => {

        const response = await cancelOrder({
            orderId
        });

        setTimeout(() => {
            window.location.href = "/summarize";
        }, 500);

    }

    const handleUpdateStatusConfirm = async e => {

        const response = await updateStatusConfirm({
            orderId
        });

        setTimeout(() => {
            window.location.href = "/summarize";
        }, 500);

    }

    const handleUpdateStatusShipping = async e => {

        const response = await updateStatusShipping({
            orderId, trackingNo
        });

        setTimeout(() => {
            window.location.href = "/summarize";
        }, 500);

    }

    const handleUpdateStatusSuccess = async e => {

        const response = await updateStatusSuccess({
            orderId
        });

        setTimeout(() => {
            window.location.href = "/summarize";
        }, 500);

    }



    const updateStatus = () => {
        if (orderStatus === "Cancel") {
            handleCancelorder();
        } else if (orderStatus === "Waiting for shipment") {
            handleUpdateStatusConfirm();
        } else if (orderStatus === "Shipping") {
            handleUpdateStatusShipping();
        } else if (orderStatus === "Success") {
            handleUpdateStatusSuccess();
        }

    }

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

    const [orderStatus, setOrderStatus] = useState(order.status);

    const [date, setDate] = useState(moment(order.date).format('YYYY-MM-DD'))

    const check2 = () => {
        return "samut";
    }

    const [trackingNo, setTrackingNo] = useState();

    const [openAddModal, setOpenAddModal] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddModal(false)
    };

    const handleClickSnackBar = () => {
        setOpenAddModal(true);
    };

    const handleClickTracking = () => {
        window.location.href = "https://track.thailandpost.co.th/";
    }

    return (

        <TableRow
            key={order.orderId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
            <TableCell component="th" scope="row" onClick={() => setSigntinModalShow(true)} >
                {order.orderId}
            </TableCell>
            <TableCell onClick={() => setSigntinModalShow(true)} align="right">{order.userId}</TableCell>
            {order.status === 'Order Canceled' ?
                <TableCell onClick={() => setSigntinModalShow(true)} align="right" style={{ color: 'red' }}>{order.status}</TableCell>
                : null
            }
            {order.status === 'Waiting for payment' ?
                <TableCell onClick={() => setSigntinModalShow(true)} align="right" style={{ color: 'blue' }}>{order.status}</TableCell>
                : null
            }
            {order.status === 'Waiting for Confirmation' ?
                <TableCell onClick={() => setSigntinModalShow(true)} align="right" style={{ color: 'green' }}>{order.status}</TableCell>
                : null
            }

            {order.status === 'Confirm , Waiting for shipment' ?
                <TableCell onClick={() => setSigntinModalShow(true)} align="right" style={{ color: 'orange' }}>{order.status}</TableCell>
                : null
            }

            {order.status === 'Success' ?
                <TableCell onClick={() => setSigntinModalShow(true)} align="right" style={{ color: 'green' }}>{order.status}</TableCell>
                : null
            }

            {order.status === 'Shipping' ?
                <TableCell onClick={() => setSigntinModalShow(true)} align="right" style={{ color: 'black' }}>{order.status} - {order.trackingNo}</TableCell>
                : null
            }

            <TableCell onClick={() => setSigntinModalShow(true)} align="right">{moment(order.date.slice(0, 10)).format("D MMMM YYYY")}</TableCell>

            <Modal className="cart-modal" show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg">
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

                        {order.status === 'Waiting for Confirmation' ?
                            <h5 style={{ color: 'green' }}> Status :  {order.status} </h5>
                            : null
                        }

                        {order.status === 'Confirm , Waiting for shipment' ?
                            <h5 style={{ color: 'orange' }}> Status :  {order.status} </h5>
                            : null
                        }

                        {order.status === 'Shipping' ?
                            (
                                <div>
                                    <h5 style={{ color: 'black' }}> Status :  {order.status} - <a className="trackingNo" onClick={handleClickTracking}>{order.trackingNo}</a></h5>

                                </div>
                            )
                            : null
                        }

                        {order.status === 'Success' ?
                            <h5 style={{ color: 'green' }}> Status :  {order.status} </h5>
                            : null
                        }

                        {/* {order.status === 'Order Canceled' ?
                            null :
                            <Button hidden={order.hasPayment !== "no-slip" || isUpload || order.status === "Confirm , Waiting for shipment"
                                || order.status === "Shipping"}
                                variant="danger" size="sm" onClick={handleCancelorder}> Cancel Order </Button>
                        } */}


                        <h5 style={{ color: 'grey' , fontSize : '16px'}}> Date :  {moment(order.date.slice(0, 10)).format("D MMMM YYYY")} </h5>


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

                        <Col>  <h4 style={{ marginLeft: '3rem' }}> Total : {price2} </h4></Col>

                    </Row>

                    <hr></hr>

                    <Row>
                        <Col >
                            <h5> Address for Shipping.</h5>
                            <h5 style={{ fontSize: '18px' }}> {address.place} </h5>
                            <h5 style={{ fontSize: '16px' }}> Reciever : {address.recieverName} </h5>
                            <h5 style={{ fontSize: '16px' }}> Reciever Tel : {address.recieverTel} </h5>
                            <h5 style={{ fontSize: '16px' }}> Address : {address.houseNumber} {address.address} {address.province} {address.postal}</h5>

                            <br></br>
                            <br></br>
                            <hr hidden={order.status == 'Order Canceled' || order.status == 'Success'} ></hr>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" hidden={order.status == 'Order Canceled' || order.status == 'Success'}>
                                <span><Form.Label> <h5> Current Order Status </h5></Form.Label></span>
                                <Form.Select aria-label="Default select example" onChange={e => { setOrderStatus(e.target.value) }}>
                                    <option value={order.status}> {order.status} </option>
                                    <option value="Waiting for shipment" hidden={order.status === 'Confirm , Waiting for shipment'}>Confirm , Waiting for shipping.</option>
                                    <option value="Shipping" hidden={order.status === 'Shipping'}>Shipping</option>
                                    <option value="Success" hidden={order.status === 'Success'}>Success</option>
                                    <option value="Cancel" hidden={order.status === 'Cancel'}>Cancel</option>
                                </Form.Select>
                            </Form.Group>
                            {orderStatus === 'Shipping' ?
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tracking No.</Form.Label>
                                    <Form.Control type="text" placeholder="Tracking No." defaultValue={order.trackingNo} onChange={e => { setTrackingNo(e.target.value) }} />
                                </Form.Group> : null
                            }

                            <Button hidden={order.status == 'Order Canceled' || order.status == 'Success'} variant="primary" onClick={() => { updateStatus(), handleClickSnackBar() }}
                                style={{ display: 'block', marginLeft: 'auto', marginRight: '0px' }}

                            >
                                Submit
                            </Button>

                        </Col>
                        <Col>
                            <h5> Payment </h5>

                            {order.hasPayment === 'no-slip' ?
                                null :
                                <img src={order.hasPayment} width="100%"></img>
                            }

                            {order.status === 'Waiting for payment' ?
                                <h5 style={{ fontSize: '16px', color: 'blue' }}> Waiting for customer upload slip.</h5> : null
                            }

                            {order.status === 'Order Canceled' ?
                                <h5 style={{ fontSize: '16px', color: 'red' }}>  Your order has been canceled.</h5> : null
                            }

                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>

            <Snackbar open={openAddModal} autoHideDuration={3000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="info" sx={{ width: '100%' }}>
                    Order Status already changed.
                </Alert>
            </Snackbar>

        </TableRow>
    );
}

export default OrderSummarize;
