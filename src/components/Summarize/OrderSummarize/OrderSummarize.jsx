import React, { useState, useEffect } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
// import './OrderDetail.css'
import axios from "axios";
// import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"
import MediaQuery from 'react-responsive'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// async function cancelOrder(order) {
//     return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/order/cancel/' + order.orderId, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         //   body: JSON.stringify({
//         //     id: product.productId
//         //   })
//     })
//     // .then(data => data.json())
// }

// async function updateOrder(order) {

//     console.log(order)

//     return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/payment/upload', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             orderId : order.orderId , userId : order.userId , paymentSlip : order.postImage.myFile
//         })
//     })
//     // .then(data => data.json())
// }

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


    return (


        <TableRow
            key={order.orderId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
            <TableCell component="th" scope="row" onClick={() => setSigntinModalShow(true)}>
                {order.orderId}
            </TableCell>
            <TableCell onClick={() => setSigntinModalShow(true)}align="right">{order.userId}</TableCell>
            <TableCell onClick={() => setSigntinModalShow(true)}align="right">{order.status}</TableCell>
            <TableCell onClick={() => setSigntinModalShow(true)}  align="right">{order.date}</TableCell>


            <Modal className="cart-modal" show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    samut
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                       samut
                    
                </Modal.Body>
            </Modal>

        </TableRow>

    );
}


export default OrderSummarize;
