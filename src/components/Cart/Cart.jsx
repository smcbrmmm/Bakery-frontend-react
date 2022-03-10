import React, { useState, useEffect } from "react";
import NavCom from "../Navbar/NavbarComponent"
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Nav, NavDropdown, Collapse, Modal, Fade } from "react-bootstrap";
import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import Button from '@mui/material/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function order(orderDetail , cart , user) {
    console.log(orderDetail)
    fetch('https://e226-2405-9800-b600-698c-6999-9220-373e-e462.ngrok.io/api/order/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, addressId: orderDetail.addressId, status: "Waiting for payment" })
    }).then(() => {
        for (var i = 0; i < cart.length; i++) {
            fetch('https://e226-2405-9800-b600-698c-6999-9220-373e-e462.ngrok.io/api/orderDetail/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId : cart[i].id , productPrice : cart[i].price , productQty : cart[i].qty , userId : orderDetail.userId
                })
            })
        }
    }).then(() => {
        setTimeout(() => {
            window.location.href = "/order";
        }, 1000);
    })


}

const Cart = ({ cart }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [userId, setUserId] = useState();
    const [addressId, setAddressId] = useState();
    const [status, setStatus] = useState();

    const handleSubmit = async e => {
        // e.preventDefault();
        const response = await order({
            userId,
            addressId,
            status
        } , cart , user);

        // setTimeout(() => {
        //     window.location.href = "/order";
        // }, 1000);

    }

    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://e226-2405-9800-b600-698c-6999-9220-373e-e462.ngrok.io/api/address/address/' + user.id,
            );
            setAddress(result.data)
            // console.log(result)
        };

        fetchData();

    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach((item) => {
            items += item.qty;
            price += item.qty * item.price;
        });

        setTotalItems(items);
        setTotalPrice(price);
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

    const [add, setAdd] = useState();
    const [recieverName, setRecieverName] = useState();
    const [recieverTel, setRecieverTel] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [province, setProvince] = useState();
    const [postal, setPostal] = useState();

    const handleSelect = (e) => {
        console.log(e.target.value);

        var indexOfValue = -1;

        for (var i = 0; i < address.length; i++) {
            if (address[i].place === e.target.value)
                indexOfValue = i;
        }

        console.log(indexOfValue)

        if (indexOfValue !== -1) {
            setAdd(address[indexOfValue].address)
            setRecieverName(address[indexOfValue].recieverName)
            setRecieverTel(address[indexOfValue].recieverTel)
            setHouseNumber(address[indexOfValue].houseNumber)
            setProvince(address[indexOfValue].province)
            setPostal(address[indexOfValue].postal)
            setAddressId(address[indexOfValue].addressId)
            setUserId(user.id)
        } else {
            setAdd("")
            setRecieverName("")
            setRecieverTel("")
            setHouseNumber("")
            setProvince("")
            setPostal("")
        }



        // setAdd(address[indexOfValue].address)
        // setRecieverName(address[indexOfValue].recieverName)
        // setRecieverTel(address[indexOfValue].recieverTel)
        // setHouseNumber(address[indexOfValue].houseNumber)
        // setProvince(address[indexOfValue].province)
        // setPostal(address[indexOfValue].postal)
        // setAddressId(address[indexOfValue].addressId)
        // setUserId(user.id)
    }



    return (
        <div className="page-container">

            <NavCom />

            <div className="content-wrap">

                <Container>

                    <h1 style={{ textAlign: 'center', marginBottom: '5%' }}> Your Cart.</h1>

                    <Row>
                        <Col sm={8}>
                            <div hidden={totalItems > 0 ? false : true}>
                                {cart.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                            <div hidden={totalItems > 0 ? true : false}>
                                <h3 style={{ textAlign: 'center' }}> No items in your cart.</h3>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="mb-4">
                                <div>

                                    <h5> Select your address for shipping.</h5>
                                    <Form.Select aria-label="Default select example" style={{ width: '61%', display: 'flex' }} onChange={handleSelect} required >
                                        <option value="default">Choose your shipping place.</option>

                                        {address.map((address) => (
                                            <option value={address.place}  > {address.place} </option>
                                        ))}
                                    </Form.Select>

                                    <Link to="/profile">
                                    <Button className="mt-1" size="small">
                                        Add your new address.
                                    </Button>
                                    </Link>
                                </div>


                                <Form.Group className="signinInput mb-1 mt-3" controlId="formBasicEmail" >
                                    <Form.Label>Reciever name</Form.Label>
                                    <Form.Control type="text" placeholder="" value={recieverName} disabled />
                                </Form.Group>

                                <Form.Group className="signinInput mb-1" controlId="formBasicEmail" >
                                    <Form.Label>Reciever tel</Form.Label>
                                    <Form.Control type="text" placeholder="" value={recieverTel} disabled />
                                </Form.Group>

                                <Form.Group className="signinInput mb-1" controlId="formBasicEmail" >
                                    <Form.Label>House Number</Form.Label>
                                    <Form.Control type="text" placeholder="" value={houseNumber} disabled />
                                </Form.Group>

                                <Form.Group className="signinInput mb-1" controlId="formBasicEmail" >
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="textarea" placeholder="" value={add} disabled />
                                </Form.Group>

                                <Form.Group className="signinInput mb-1" controlId="formBasicEmail" >
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control type="textarea" placeholder="" value={province} disabled />
                                </Form.Group>

                                <Form.Group className="signinInput mb-1" controlId="formBasicEmail" >
                                    <Form.Label>Postal</Form.Label>
                                    <Form.Control type="textarea" placeholder="" value={postal} disabled />
                                </Form.Group>


                            </div>
                            <div>
                                <h4 className="main">Cart Summary</h4>
                                <div className="main">
                                    <span>TOTAL: ({totalItems})</span>
                                    <span>$ {totalPrice}</span>
                                </div>

                                <Button className="main" onClick={() => { handleSubmit(); handleClick() }} >
                                    Checkout
                                </Button>

                                {/* <button className="main" onClick={() => { handleSubmit(); handleClick() }}>
                                    Checkout
                                </button> */}
                            </div>
                        </Col>
                    </Row>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Order has been saved.
                        </Alert>
                    </Snackbar>
                </Container>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    };
};

export default connect(mapStateToProps)(Cart);