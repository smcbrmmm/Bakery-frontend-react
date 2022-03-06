import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import './Products.css'
import NavbarCom from "../Navbar/NavbarComponent"

// Redux
import { connect } from "react-redux";

import Product from "./Product/Product";

import {
    setProductList
} from "../../redux/Shopping/shopping-actions";

import { useMediaQuery } from 'react-responsive'

async function addProduct(product) {
    console.log(product)
    return fetch('http://localhost:8090/api/products/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: product.productName , name : product.productName , price : product.price , qty : product.qty , img : "https://www.mychineserecipes.com/wp-content/uploads/2020/06/Egg-Yolk-Lotus-Paste-Pastry-Recipe.jpg" 
        , description : product.description , tag : product.tag
      })
    })
    .then(data => data.json())
}


const Products = ({ products, setProductList }) => {

    const [pastry, setPastry] = useState(false);
    const [roastedPastry, setRoastedPastry] = useState(true);
    const [riceCracker, setRiceCracker] = useState(true);
    /////////
    const [addProductModal, setAddProductModal] = useState(false);
    /////////
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [files, setFile] = useState([]);


    useEffect(() => {
        // Update the document title using the browser API
        fetch('http://f4c3-2001-44c8-440d-9067-f860-d0e1-1d4f-76f6.ngrok.io/api/products/allProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => setProductList(data))
    }, []);

    const handleInsertProduct = async e => {

        const response = await addProduct({
            productName, price, tag, description, qty
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

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const [productName, setProductName] = useState();
    const [price, setPrice] = useState();
    const [tag, setTag] = useState();
    const [description, setDescription] = useState();
    const [qty, setQty] = useState();

    //////////


    return (
        <div className="page-container">
            <NavbarCom />
            <div className="content-wrap">
                {/* <Container>
                    <h1 className="main" style={{ textAlign: 'center' }}>  Mymom Bakery's Menu </h1>
                </Container> */}

                <Container style={{ marginTop: '4rem' }}>
                    <Row style={{ marginBottom: '1rem' }}>
                        <Col sm={3}>
                            <h2 className="main" style={{ marginBottom: '2rem' }}>  Category </h2>
                            <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("pastry")} >  Chinese Pastry </h5></a>
                            <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("roastedPastry")}>  Roasted Chinese Pastry </h5></a>
                            <a href="#" className="cat-menu"><h5 className="cat-menu" onClick={() => categoryFilter("riceCracker")}>  Rice Cracker </h5></a>
                        </Col>
                        <Col sm={9}>
                            <h2 className="main" style={{ textAlign: 'left', marginBottom: '2rem' }} >  Products
                                <Button className="button-add" variant="success" style={{ marginLeft: '1rem' }}
                                    onClick={() => setAddProductModal(true)}> Insert </Button>
                            </h2>

                            <Row>
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
                                    <input type='file' onChange={onSelectFile} />
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
                                        <Button variant="primary" size="lg" onClick={handleInsertProduct} >
                                            Insert this product
                                        </Button>

                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
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
        setProductList: data => dispatch(setProductList(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);