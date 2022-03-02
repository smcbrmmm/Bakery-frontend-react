import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// Redux
import { connect } from "react-redux";

import {
  loadCurrentItem,
  addToCart,
} from "../../../redux/Shopping/shopping-actions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Product = ({ product, addToCart, loadCurrentItem , hid }) => {
  const user = JSON.parse(localStorage.getItem('user'));

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

  return (
    <Col className="main" hidden={hid}>
      <Card style={{ width: '18rem', display: 'flex', marginBottom: '1rem' }}>
        <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
          src={product.img} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <h5 style={{fontSize:'14px'}}>{product.tag}</h5>
          <h5 style={{ fontSize: '18px' }}> {product.price} Baht.</h5>
          <Button hidden={!user || product.qty===0} variant="primary"  onClick={() => {addToCart(product.id) ; handleClick() }}>Add to cart</Button>
          <Button hidden={!user || !(product.qty===0)} disabled variant="secondary" onClick={() => {addToCart(product.id) ; handleClick() }}>Out of stock</Button>
          <h5 className="mt-2" style={{ fontSize: '14px' }}> Remaining : {product.qty} </h5>
        </Card.Body>
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Product already add to your cart.
        </Alert>
      </Snackbar>

    </Col>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(Product);