import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Row, Container, FormControl, Nav, NavDropdown, Collapse, Modal  , Form} from "react-bootstrap";
import CartItem from "./CartItem/CartItem";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MediaQuery from 'react-responsive'
import NavCom from "../Navbar/NavbarComponent"
import { connect } from "react-redux";

import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import {
    setProductInCart,
    setProductList
} from "../../redux/Shopping/shopping-actions";


async function order(orderDetail, cart, user) {
    console.log(orderDetail)
    fetch('https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/order/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, addressId: orderDetail.addressId, status: "Waiting for payment" })
    }).then(() => {
        for (var i = 0; i < cart.length; i++) {
            fetch('https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/orderDetail/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: cart[i].id, productPrice: cart[i].price, productQty: cart[i].qty, userId: orderDetail.userId
                })
            })
        }
    }).then(() => {
        setTimeout(() => {
            window.location.href = "/order";
        }, 1000);
    })


}

async function deleteAllItemInCart(cartItem) {
    console.log(cartItem)
    return fetch('https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/cart/inCart/deleteAllItem', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: cartItem.userId
        })
    })
    // .then(data => data.json())
}


const Cart = ({ cart, setProductInCart }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        window.location.href = "/lineloginmobile";
    }

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [userId, setUserId] = useState(user ? user.id : 100);
    const [addressId, setAddressId] = useState();
    const [status, setStatus] = useState();

    const handleSubmit = async e => {

        if(place === "no"){
            console.log("no place")
        }else{
            const response = await order({
                userId,
                addressId,
                status
            }, cart, user);
        }

        // e.preventDefault();
        // const response = await order({
        //     userId,
        //     addressId,
        //     status
        // }, cart, user);

        // setTimeout(() => {
        //     window.location.href = "/order";
        // }, 1000);

    }

    const handleDeletAllItemInCart = async e => {

        if(place !== "no"){
            const response = await deleteAllItemInCart({
                userId
            });
        }

        // setTimeout(() => {
        //   window.location.href = "/products";
        // }, 1000);

    }

    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/address/address/' + user.id,
            );
            setAddress(result.data)
            // console.log(result)
        };

        fetchData();

        fetch('https://b311-2405-9800-b600-6272-1c50-caaf-f6dc-2e24.ngrok.io/api/cart/inCart/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => setProductInCart(data))

    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        if(place !== "no"){
            setOpen(true);
        }
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
    const [place , setPlace] = useState("no");

    const handleSelect = (e) => {
        console.log(e.target.value);

        var indexOfValue = -1;

        for (var i = 0; i < address.length; i++) {
            if (address[i].place === e.target.value)
                indexOfValue = i;
        }

        console.log(indexOfValue)

        if (indexOfValue !== -1) {
            setPlace(address[indexOfValue].place)
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

    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/profile';
        navigate(path);
    }

    const validationAddress = () => {
        if(place === "no"){
            console.log("no item in cart")
            swal("Error", "Please select address for shipping.", "error");
            console.log(cart.length)
        }else if(place !=="no" && cart.length=== 0){
            swal("Error", "No Items in your cart.", "error");
        }
        else{
            handleSubmit();
            handleClick(); 
            handleDeletAllItemInCart();
        }
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
                                    <MediaQuery maxWidth={1224}>
                                        <hr></hr>
                                    </MediaQuery>
                                    <h5> Select your address for shipping.</h5>
                                    <Form.Select aria-label="Default select example" style={{ width: '61%', display: 'flex' }} onChange={handleSelect} required >
                                        <option value="default">Choose your shipping place.</option>

                                        {address.map((address) => (
                                            <option value={address.place} > {address.place} </option>
                                        ))}
                                    </Form.Select>

                                    <Button className="mt-1" size="small" onClick={routeChange}>
                                        Add your new address.
                                    </Button>
                                </div>


                                <Form.Group className="signinInput mb-1 mt-3" controlId="formBasicEmail" >
                                    <Form.Label>Receiver name</Form.Label>
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
                            <div style={{marginBottom : '3rem'}}>
                                <h4 className="main"  style={{fontSize : '26px' , marginBottom : '0.5rem'}}>Cart Summary</h4>
                                <div className="main" style={{fontSize : '22px' , marginBottom : '0.5rem'}}>
                                    <span>TOTAL: ({totalItems})</span>
                                    <span> {totalPrice} Baht.</span>
                                </div>

                                <Button className="main" variant="contained" size="large" onClick={() => { validationAddress() }} >
                                    Checkout
                                </Button>

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

const mapDispatchToProps = dispatch => {
    return {
        setProductList: data => dispatch(setProductList(data)),
        setProductInCart: data => dispatch(setProductInCart(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);