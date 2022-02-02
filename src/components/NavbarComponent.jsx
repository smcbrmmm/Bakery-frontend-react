import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import image from '../images/mymom-logo.png'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import swal from 'sweetalert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';

async function loginUser(credentials) {
    return fetch('http://localhost:8090/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function CartModal(props) {

    let menuInCarts = [
        {
            name: "Taro Pastry",
            img: "https://live.staticflickr.com/65535/51446236924_56e46b5a79_b.jpg",
            quantity: "1",
            price: "30"
        },
        {
            name: "Banana Pastry",
            img: "https://food-fanatic-res.cloudinary.com/iu/s--S_S_HTSQ--/c_thumb,f_auto,g_auto,h_1200,q_auto,w_1200/v1518565759/banana-nutella-puff-pastry-cups-photo",
            quantity: "2",
            price: "80"
        }
    ]
    return (
        <Modal className="cart-modal"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Your Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={6} md={4}>
                        <h3 className="order-detail-cart" > Menu </h3>
                    </Col>
                    <Col xs={6} md={4}>
                        <h3 className="order-detail-cart" > Quantity </h3>
                    </Col>
                    <Col xs={6} md={4}>
                        <h3 className="order-detail-cart" > Price (Baht)</h3>
                    </Col>
                </Row>
                {menuInCarts.map((data, id) => {
                    return <Row key={id}>
                        <Col xs={6} md={4}>
                            <span>
                                <h3 className="order-detail-cart" > {data.name} </h3>
                                <img src={data.img} alt="" style={{ width: '160px', height: '110px', marginLeft: '2rem' }} />
                            </span>
                        </Col>
                        <Col xs={6} md={4}>
                            <h3 className="order-detail-cart" > {data.quantity} </h3>
                        </Col>
                        <Col xs={6} md={4}>
                            <h3 className="order-detail-cart" > {data.price} </h3>
                        </Col>
                    </Row>
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Confirm Order</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function SigninModal(props) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        if ('accessToken' in response) {
            swal("Success", response.message, "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {
                    localStorage.setItem('accessToken', response['accessToken']);
                    localStorage.setItem('user', JSON.stringify(response['user']));
                    window.location.href = "/order";
                });
        } else {
            swal("Failed", response.message, "error");
        }
    }

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/linelogin')
    }

    return (
        <Modal className="cart-modal"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="formSignin" onSubmit={handleSubmit}>
                    <Form.Group className="signinInput mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="signinInput mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit">
                            Sign in
                        </Button>
                        <Button variant="success" size="lg" onClick={redirect}>
                            Sign in with Line. <img src="https://img.icons8.com/color/34/000000/line-me.png"/>
                        </Button>
                        <Link to="/createaccount"> create </Link>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        background : 'red'
    },
}));


export default function NavbarComponent() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [modalShow, setModalShow] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [signupModalShow, setSignupModalShow] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className="App">
            <Navbar className="nav" bg="light">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }, { marginLeft: '5rem' }}
                    navbarScroll>
                    <Navbar.Brand href="#home">
                        <Link to='/' className="linkTo"><h2 className="nav-menu" style={{ textAlign: 'left' }}> <img src={image} style={{ width: '50px', height: '50px' }} hidden="true" /> Mymom Bakery

                        </h2></Link>
                    </Navbar.Brand>
                </Nav>
                <Nav className="color-nav" style={{ maxHeight: '100px' }, { marginRight: '5rem' }}>
                    {/* <Nav.Link href="/">  <h4 className="nav-menu">Home</h4>  </Nav.Link> */}
                    <Nav.Link href="/"  >
                        <Tooltip title="Home">
                            <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                <HomeIcon sx={{ fontSize: 30 }} style={{ fill: "grey" }} />
                            </IconButton>
                        </Tooltip>
                    </Nav.Link>
                    <Nav.Link href="/menu">
                        <Tooltip title="Menu">
                            <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                <RestaurantMenuOutlinedIcon sx={{ fontSize: 30 }} style={{ fill: "grey" }} />
                            </IconButton>
                        </Tooltip>
                    </Nav.Link>

                    <Nav.Link href="/contactus">
                        <Tooltip title="Contract Us">
                            <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                <PermContactCalendarIcon sx={{ fontSize: 30 }} style={{ fill: "grey" }} />
                            </IconButton>
                        </Tooltip>
                    </Nav.Link>
                    <Nav.Link onClick={() => setModalShow(true)} hidden={!user}>
                        <Tooltip title="Cart">
                            <IconButton aria-label="cart" size="large" className="nav-menu" >
                                <StyledBadge badgeContent={4} color="warning">
                                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </Nav.Link>
                    <Nav.Link hidden={!user} >
                        <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <AccountCircleIcon sx={{ fontSize: 30 }} style={{ fill: "grey" }} />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem component={Link} onClick={handleClose} to="/profile">Account</MenuItem>
                            <MenuItem component={Link} to="/order" onClick={handleClose}>Order Status</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                        </Menu>
                    </Nav.Link>

                    <Nav.Link hidden={user} onClick={() => setSigntinModalShow(true)}>
                        <Tooltip title="Login">
                            <IconButton aria-label="cart" size="large" className="nav-menu" >
                                <LoginIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>
                    </Nav.Link>
                </Nav>
            </Navbar>

            <CartModal
                show={modalShow}
                onHide={() => setModalShow(false)} />


            <SigninModal show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
            />

            <signupModalShow show={signupModalShow}
                onHide={() => setSignupModalShow(false)}
            />
        </div>
    )


}
