import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import './Products.css'
import NavbarCom from "../Navbar/NavbarComponent"
import Hamburger from 'hamburger-react'
// Redux
import { connect } from "react-redux";

import Product from "./Product/Product";

import {
    setProductInCart,
    setProductList
} from "../../redux/Shopping/shopping-actions";

import { useMediaQuery } from 'react-responsive'

import MediaQuery from 'react-responsive'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  

async function addProduct(product) {
    console.log(product)
    return fetch('https://22ce-2405-9800-b600-6272-c873-ef36-e159-44b6.ngrok.io/api/products/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: product.productName, name: product.productName, price: product.price, qty: product.qty
            , img: product.postImage.myFile
            , description: product.description, tag: product.tag
        })
    })
        .then(data => data.json())
}


const Products = ({ products, setProductList, setProductInCart }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [role, setRole] = useState(user ? user.role : 'N')

    const [userId, setUserId] = useState(user ? user.id : '100')



    const [pastry, setPastry] = useState(false);
    const [roastedPastry, setRoastedPastry] = useState(true);
    const [riceCracker, setRiceCracker] = useState(true);
    /////////
    const [addProductModal, setAddProductModal] = useState(false);
    /////////
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [files, setFile] = useState([]);
    var no_pastry = 1;
    var no_roastPastry = 1;
    var no_riceCracker = 1;

    const [isOpen, setOpen] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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


    useEffect(() => {
        // Update the document title using the browser API
        fetch('https://22ce-2405-9800-b600-6272-c873-ef36-e159-44b6.ngrok.io/api/products/allProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => setProductList(data))
            
        fetch('https://22ce-2405-9800-b600-6272-c873-ef36-e159-44b6.ngrok.io/api/cart/inCart/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => setProductInCart(data))

        window.addEventListener("scroll", toggleVisibility);

    }, []);

    const handleInsertProduct = async e => {

        const response = await addProduct({
            productName, price, tag, description, qty, postImage
        });

        setTimeout(() => {
            window.location.href = "/products";
        }, 1000);

    }


    const categoryFilter = (category) => {
        setPastry(true)
        setRoastedPastry(true)
        setRiceCracker(true)
        if (category == "pastry") {
            setPastry(false)
        }
        else if (category == "roastedPastry") {
            setRoastedPastry(false)
        }
        else if (category == "riceCracker") {
            setRiceCracker(false)
        }
    }

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
        console.log(files)
    }

    const [postImage, setPostImage] = useState({
        myFile: "",
    });

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


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64 });
        console.log(postImage.myFile.length)

    };

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const [productName, setProductName] = useState();
    const [price, setPrice] = useState();
    const [tag, setTag] = useState();
    const [description, setDescription] = useState();
    const [qty, setQty] = useState();

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 50) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="page-container">
            <NavbarCom />
            <div className="content-wrap">
                {/* <Container>
                    <h1 className="main" style={{ textAlign: 'center' }}>  Mymom Bakery's Menu </h1>
                </Container> */}

                <Container >
                    <Row style={{ marginBottom: '1rem' }}>
                        <Col sm={3}>

                            <MediaQuery minWidth={1224} >
                                <h2 className="main" style={{ marginBottom: '2rem', marginTop: '4rem' }}>  Category </h2>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("pastry")} >  Popular Product </h5></a>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("pastry")} >  Chinese Pastry </h5></a>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("roastedPastry")}>  Roasted Chinese Pastry </h5></a>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("riceCracker")}>  Rice Cracker </h5></a>
                            </MediaQuery>
                            {/* <MediaQuery maxWidth={1224}>
                                <h2 className="main" style={{ marginBottom: '2rem' }}>  Category  </h2>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("pastry")} >  Chinese Pastry </h5></a>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("roastedPastry")}>  Roasted Chinese Pastry </h5></a>
                                <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("riceCracker")}>  Rice Cracker </h5></a>
                                <hr></hr>
                            </MediaQuery> */}
                        </Col>
                        <Col sm={9}>
                            <MediaQuery minWidth={1224} >
                                <h2 className="main" style={{ textAlign: 'left', marginBottom: '2rem', marginTop: '4rem' }} >  Products
                                    <Button className="button-add" variant="success" style={{ marginLeft: '1rem' }}
                                        onClick={() => setAddProductModal(true)} hidden={role == 'C' || role == 'N'}> Insert </Button>
                                </h2>
                            </MediaQuery>

                            <MediaQuery maxWidth={1224} >
                                <Row>
                                    <Col >
                                        <h1 className="main" style={{ textAlign: 'left', marginBottom: '1rem', marginTop: '1rem', fontSize: '30px' }} >  Products
                                            <Button className="button-add" variant="success" style={{ marginLeft: '1rem' }}
                                                onClick={() => setAddProductModal(true)} hidden={role == 'C' || role == 'N'}> Insert </Button>
                                        </h1>
                                    </Col>

                                    <Col>
                                        <div style={{ display: 'block', marginLeft: '8rem', marginRight: 0, marginTop: '1.5rem' }}>
                                            <ArrowDropDownIcon sx={{ fontSize: 30 }} style={{ fill: "black" }} onClick={handleClick} />

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}>
                                                <div >
                                                    <MenuItem onClick={() => { categoryFilter("pastry"); handleClose() }} >Chinese Pastry</MenuItem>
                                                    <MenuItem onClick={() => { categoryFilter("roastedPastry"), handleClose() }} >Roasted Chinese Pastry </MenuItem>
                                                    <MenuItem onClick={() => { categoryFilter("riceCracker"), handleClose() }} >Rice Cracker</MenuItem>
                                                </div>
                                            </Menu>

                                        </div>


                                    </Col>
                                </Row>
                            </MediaQuery>


                            <Row lg={3}>
                                {products.map((product) => (

                                    product.tag === "Pastry"
                                        ? (<Product key={product.id} product={product} hid={pastry} />)
                                        : product.tag === "Roasted Pastry"
                                            ? (<Product key={product.id} product={product} hid={roastedPastry} />)
                                            : product.tag === "Rice Cracker"
                                                ? (<Product key={product.id} product={product} hid={riceCracker} />)
                                                : null
                                ))}
                            </Row>
                            {/* {isVisible &&
                                <div onClick={scrollToTop}>
                                    <img src='https://i.postimg.cc/44Ytsk8Z/top-arrow-emoj.png' alt='Go to top' style={{ display: 'block', marginLeft: 'auto', marginRight: '1rem' }} />
                                </div>} */}
                        </Col>
                    </Row>



                </Container>

                <Modal className="cart-modal" show={addProductModal}
                    onHide={() => setAddProductModal(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Insert your product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <h4> Product Photo</h4>

                                <img hidden={files.length != 0} src="https://cdn-icons-png.flaticon.com/512/3342/3342137.png" width="370px" height="370px" ></img>

                                {files.map((file, key) => {
                                    return (
                                        <div key={key} className="Row">
                                            <span className="Filename">
                                                <img src={URL.createObjectURL(file)} width="100%" />
                                            </span>
                                        </div>
                                    )
                                })}
                                <div className="mt-5">
                                    {/* <input type='file' onChange={onSelectFile} /> */}
                                    <input
                                        type="file"
                                        label="Image"
                                        name="myFile"
                                        accept=".jpeg, .png, .jpg"
                                        onChange={(e) => { handleFileUpload(e); onSelectFile(e) }}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <Form className="formSignin" >
                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Product name</Form.Label>
                                        <Form.Control type="text" onChange={e => { setProductName(e.target.value) }} />
                                    </Form.Group>
                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" min={0} onChange={e => { setPrice(e.target.value) }} />
                                    </Form.Group>
                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Tag</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={e => { setTag(e.target.value) }} >
                                            <option >Select type</option>
                                            <option value="Pastry">Chinese Pastry</option>
                                            <option value="Roasted Pastry">Roasted Chinese Pastry</option>
                                            <option value="Rice Cracker">Rice Cracker </option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={2} onChange={e => { setDescription(e.target.value) }} />
                                    </Form.Group>

                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="number" onChange={e => { setQty(e.target.value) }} />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="primary" size="lg" onClick={() => {handleInsertProduct() , handleClickSnackBar()}} >
                                            Insert this product
                                        </Button>

                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>

                <Snackbar open={openAddModal} autoHideDuration={3000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                        Product already added to shop.
                    </Alert>
                </Snackbar>




            </div>


        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.shop.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProductList: data => dispatch(setProductList(data)),
        setProductInCart: data => dispatch(setProductInCart(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);