import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// Redux
import { connect } from "react-redux";

import ButtonMat from '@mui/material/Button';
import './Product.css'

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import {
  loadCurrentItem,
  addToCart,
} from "../../../redux/Shopping/shopping-actions";
import { Segment } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function deleteProduct(product) {
  console.log(product)
  return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/products/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: product.productId
    })
  })
  // .then(data => data.json())
}

async function insertProduct(product) {
  console.log(product)
  return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/cart/inCart/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId : product.userId , productId : product.productId , qty : 1
    })
  })
  // .then(data => data.json())
}


const Product = ({ product, addToCart, loadCurrentItem, hid }) => {



  const user = JSON.parse(localStorage.getItem('user'));
  
  const [userId , setUserId] = useState(user ? user.id :  100);

  // if(user){
  //   setUserId(user.id)
  // }

  const [role , setRole] = useState(user ? user.role : 'N')

  const [open, setOpen] = React.useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [modalShow, setModalShow] = React.useState(false);

  const [productId, setProductId] = useState(product.id);

  const [longText , setLongText] = useState(product.description)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickAdd = () => {
    setOpenAddModal(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenAddModal(false)
  };


  const handleDeleteProduct = async e => {

    const response = await deleteProduct({
      productId
    });

    setTimeout(() => {
      window.location.href = "/products";
    }, 1000);

  }


  const handleInserProduct = async e => {

    const response = await insertProduct({
      userId , productId
    });

    // setTimeout(() => {
    //   window.location.href = "/products";
    // }, 1000);

  }

  return (

    
    <Col className="main" hidden={hid}>
      <Card style={{ width: '18rem', display: 'flex', marginBottom: '1rem' }}>
        {/* <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
          src={product.img} /> */}

        <Tooltip title={<h5 style={{fontSize:'16px'}}> {longText} </h5>} placement="bottom">
          <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
            src={product.img} />
        </Tooltip>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <h5 style={{ fontSize: '14px' }}>{product.tag}</h5>
          <h5 style={{ fontSize: '18px' }}> {product.price} Baht</h5>
          <Button hidden={!user || product.qty === 0} variant="primary" onClick={() => { addToCart(product.id); handleClickAdd() ; handleInserProduct() }}>Add to Cart</Button>
          <Button hidden={!user || !(product.qty === 0)} disabled variant="secondary" 
                    onClick={() => { addToCart(product.id); handleClick() ; handleInserProduct() }}>Out of Stock</Button>
          <h5 className="mt-2" style={{ fontSize: '14px' , color: 'red' }}> Remaining : {product.qty}</h5>


          <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '0' }}>
            <div className="button-admin">
              <Button size="sm" style={{ marginRight: '0.5rem' }} hidden={role == 'C' || role =='N'} > Edit </Button>
              <Button size="sm" variant="danger" onClick={() => setModalShow(true)} hidden={role == 'C' || role =='N'} > Remove </Button>
            </div>
          </div>

          <Modal className="cart-modal" show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Delete your product in store.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5> Are you sure to delete this product.</h5>

              <Button variant='danger' style={{ display: 'block', marginLeft: 'auto' }} onClick={() => { handleDeleteProduct(); handleClick() }}> Delete</Button>
            </Modal.Body>
          </Modal>


        </Card.Body>
      </Card>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Product already deleted from your shop.
        </Alert>
      </Snackbar>

      <Snackbar open={openAddModal} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Product already added to your cart.
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