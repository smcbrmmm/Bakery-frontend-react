import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

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
import DehazeIcon from '@mui/icons-material/Dehaze';
import LineLoginComponent from "../Login/LineLoginComponent";
import ListAltIcon from '@mui/icons-material/ListAlt';
import MediaQuery from 'react-responsive'
import SummarizeIcon from '@mui/icons-material/Summarize';

const liff = window.liff

async function loginUser(credentials) {
    console.log(credentials)
    return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.username, password: credentials.password })
    })
        .then(data => data.json())

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

    const [data, setData] = useState([]);

    useEffect(() => {
        liff.init({ liffId: '1656735773-AvMkVePR' })
            .catch(err => { throw err });
    }, [])

    const handleLineLogin = () => {
        if (liff.isLoggedIn()) {
            console.log("login already");
        }
        else {
            liff.login();
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
                        <Form.Control type="email" placeholder="" onChange={e => setUserName(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="signinInput mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit">
                            Sign in
                        </Button>
                        <Button variant="success" size="lg" onClick={handleLineLogin}>
                            Sign in with Line. <img src="https://img.icons8.com/color/34/000000/line-me.png" />
                        </Button>

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
        background: 'red'
    },
}));


const NavbarComponent = ({ cart }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [modalShow, setModalShow] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const [role , setRole] = useState(user ? user.role : "N")

    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [signupModalShow, setSignupModalShow] = useState(false);
    const [cartCount, setCartCount] = useState(0);

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


    useEffect(() => {
        let count = 0;
        cart.forEach((item) => {
            count += item.qty;
        });

        setCartCount(count);
    }, [cart, cartCount]);

    const text = "Mymom \n Bakery"

    return (

        <div className="App">

            <MediaQuery minWidth={1224}>
                <Navbar className="nav" bg="dark">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Navbar.Brand href="#home">
                            <Link to='/' className="linkTo">
                                <h2 className="nav-menu" style={{ textAlign: 'left', color: 'white' }}> {text} </h2>
                            </Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav className="color-nav" style={{ maxHeight: '100px' }}>
                        {/* <Nav.Link href="/">  <h4 className="nav-menu">Home</h4>  </Nav.Link> */}
                        <Nav  >
                            <Link to="/">
                                <Tooltip title="Home">
                                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                        <HomeIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Nav>
                        <Nav >
                            <Link to="/products">
                                <Tooltip title="Menu">
                                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                        <RestaurantMenuOutlinedIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>

                            </Link>
                        </Nav>
                        <Nav hidden={!user || role==='C'}>
                            <Link to="/summarize">
                                <Tooltip title="Menu">
                                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                        <SummarizeIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>

                            </Link>
                        </Nav>



                        <Nav hidden={role==='A'}>
                            <Link to="/contactus">
                                <Tooltip title="Contract Us">
                                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ marginTop: '5px' }} >
                                        <PermContactCalendarIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Nav>
                        <Nav hidden={!user || role==='A'}>
                            <Link to="/cart" >
                                
                                <Tooltip title="Cart ">
                                    <IconButton aria-label="cart" size="large" className="nav-menu"  >
                                        <StyledBadge badgeContent={cartCount} color="warning">
                                            <ShoppingCartIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Nav>


                        <Nav hidden={!user || role==='A'}>
                            <Link to="/order"  >
                                <Tooltip title="Order Status">
                                    <IconButton aria-label="cart" size="large" className="nav-menu"  >
                                        <ListAltIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Nav>

                        <Nav hidden={!user} >

                            <IconButton color="primary" aria-label="upload picture" component="span" id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <AccountCircleIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
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
                                <MenuItem  hidden={role==='A'} component={Link} onClick={handleClose} to="/profile">Account</MenuItem>
                                {/* <MenuItem component={Link} to="/order" onClick={handleClose}>Order Status</MenuItem> */}
                                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                            </Menu>
                        </Nav>

                        
                        {/* onClick={() => setSigntinModalShow(true)} */}
                        <Link to="/lineloginmobile" hidden={user}  >
                        <Nav   >
                            <Tooltip title="Login">
                                <IconButton aria-label="cart" size="large" className="nav-menu" >
                                    <LoginIcon sx={{ fontSize: 30 }} style={{ fill: "white" }}  />
                                </IconButton>
                            </Tooltip>
                        </Nav>
                        </Link>

                    </Nav>
                </Navbar>
            </MediaQuery>

            <MediaQuery maxWidth={1224}>
                <Navbar className="nav" bg="dark">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Navbar.Brand href="#home">
                            <Link to='/' className="linkTo">
                                <h2 className="nav-menu" style={{ textAlign: 'left', color: 'white', fontSize: '14px' }}> Mymom Bakery</h2>
                            </Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav className="color-nav" style={{ maxHeight: '100px' }}>

                        <Nav  >
                            <Link to="/products">
                                <Tooltip title="Menu">
                                    <IconButton color="primary" aria-label="upload picture" component="span" >
                                        <RestaurantMenuOutlinedIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>

                            <Link to="/contactus">
                                <Tooltip title="Contract Us">
                                    <IconButton color="primary" aria-label="upload picture" component="span" >
                                        <PermContactCalendarIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            

                            <Link to="/cart" hidden={!user}  >
                                <IconButton color="primary" aria-label="upload picture" component="span" id="basic-button">
                                    <StyledBadge badgeContent={cartCount} color="warning">
                                        <ShoppingCartIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </StyledBadge>
                                </IconButton>
                            </Link>


                            <Link to="/order" hidden={!user} >
                                <Tooltip title="Order Status">
                                    <IconButton color="primary" aria-label="upload picture" component="span" >
                                        <ListAltIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>


                            <IconButton color="primary" aria-label="upload picture" component="span" id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <DehazeIcon sx={{ fontSize: 30 }} style={{ fill: "white" }} />
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

                                {/* <MenuItem component={Link} onClick={handleClose} to="/">Home</MenuItem> */}
                                <MenuItem hidden={user} component={Link} onClick={handleClose} to="/lineloginmobile" >Login</MenuItem>
                                {/* <MenuItem component={Link} onClick={handleClose} to="/products">Menu</MenuItem> */}
                                {/* <MenuItem component={Link} onClick={handleClose} to="/contactus">Contact Us</MenuItem> */}
                                {/* <MenuItem hidden={!user} component={Link} onClick={handleClose} to="/cart">Cart</MenuItem> */}
                                <MenuItem hidden={!user} component={Link} onClick={handleClose} to="/profile">Profile</MenuItem>
                                {/* <MenuItem hidden={!user} component={Link} to="/order" onClick={handleClose}>Order Status</MenuItem> */}
                                <MenuItem hidden={!user} onClick={handleLogout}>Sign out</MenuItem>
                            </Menu>
                        </Nav>



                    </Nav>
                </Navbar>
            </MediaQuery>

            <SigninModal show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
            />

            <signupModalShow show={signupModalShow}
                onHide={() => setSignupModalShow(false)}
            />
        </div >
    )


}

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    };
};

export default connect(mapStateToProps)(NavbarComponent);
