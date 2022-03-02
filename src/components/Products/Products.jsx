import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import './Product.css'
import NavbarCom from "../Navbar/NavbarComponent"

// Redux
import { connect } from "react-redux";

import Product from "./Product/Product";

import {
    setProductList
} from "../../redux/Shopping/shopping-actions";

const Products = ({ products, setProductList }) => {

    const [pastry, setPastry] = useState(false);
    const [roastedPastry, setRoastedPastry] = useState(true);
    const [riceCracker, setRiceCracker] = useState(true);

    useEffect(() => {
        // Update the document title using the browser API
        fetch('http://localhost:8090/api/products/allProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => setProductList(data))
    }, []);


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
                            <h2 className="main" style={{ textAlign: 'left', marginBottom: '2rem' }} >  Product </h2>
                            <Row>
                                {products.map((product) => (
                                    product.tag==="Pastry"
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