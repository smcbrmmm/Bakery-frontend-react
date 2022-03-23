import React, { Component, useEffect, useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Modal } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// Redux
import { connect } from "react-redux";

import ButtonMat from '@mui/material/Button';
import './Product.css'

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import MediaQuery from 'react-responsive'

import {
  loadCurrentItem,
  addToCart,
} from "../../../redux/Shopping/shopping-actions";
import { Segment } from "@mui/icons-material";
import { trusted } from "mongoose";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function deleteProduct(product) {
  console.log(product)
  return fetch('https://cf31-2405-9800-b600-6272-1023-5056-cc19-5c83.ngrok.io/api/products/delete', {
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
  return fetch('https://cf31-2405-9800-b600-6272-1023-5056-cc19-5c83.ngrok.io/api/cart/inCart/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: product.userId, productId: product.productId, qty: 1
    })
  })
  // .then(data => data.json())
}


const Product = ({ product, addToCart, loadCurrentItem, hid }) => {


  const user = JSON.parse(localStorage.getItem('user'));

  const [userId, setUserId] = useState(user ? user.id : 100);

  // if(user){
  //   setUserId(user.id)
  // }

  const [role, setRole] = useState(user ? user.role : 'N')

  const [open, setOpen] = React.useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [modalShow, setModalShow] = React.useState(false);

  const [productId, setProductId] = useState(product.id);

  const [longText, setLongText] = useState(product.description)

  const [editProductShow, setEditProductShow] = useState(false);

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
      userId, productId
    });

    // setTimeout(() => {
    //   window.location.href = "/products";
    // }, 1000);

  }


  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [tag, setTag] = useState();
  const [description, setDescription] = useState();
  const [qty, setQty] = useState();


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

  const [files, setFile] = useState([]);



  return (

    <Col className="main" hidden={hid}>


      <MediaQuery minWidth={1224} >
        <Card style={{ width: '18rem', display: 'flex', marginBottom: '1rem' }}>
          {/* <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
          src={product.img} /> */}

          <Tooltip title={<h5 style={{ fontSize: '16px' }}> {longText} </h5>} placement="bottom">
            <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
              src={product.img} />
          </Tooltip>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <h5 style={{ fontSize: '14px' }}>{product.tag}</h5>
            <h5 style={{ fontSize: '18px' }}> {product.price} Baht</h5>
            <Button hidden={!user || product.qty === 0 || role === 'A'} variant="primary" onClick={() => { addToCart(product.id); handleClickAdd(); handleInserProduct() }}>Add to Cart</Button>
            <Button hidden={!user || !(product.qty === 0) || role === 'A'} disabled variant="secondary"
              onClick={() => { addToCart(product.id); handleClick(); handleInserProduct() }}>Out of Stock</Button>
            <h5 className="mt-2" style={{ fontSize: '14px', color: 'red' }}> Remaining : {product.qty}</h5>


            <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '0' }}>
              <div className="button-admin">
                <Button size="sm" style={{ marginRight: '0.5rem' }} hidden={role == 'C' || role == 'N'} onClick={() => setEditProductShow(true)} > Edit </Button>
                <Button size="sm" variant="danger" onClick={() => setModalShow(true)} hidden={role == 'C' || role == 'N'} > Remove </Button>
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
      </MediaQuery>

      <MediaQuery maxWidth={1224} >
        <div style={{  display : 'flex' , justifyContent : 'center'}}>
          <Card style={{ width: '18rem', display: 'flex', marginBottom: '1rem' }}>
            {/* <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
          src={product.img} /> */}

            <Tooltip title={<h5 style={{ fontSize: '16px' }}> {longText} </h5>} placement="bottom">
              <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
                src={product.img} />
            </Tooltip>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <h5 style={{ fontSize: '14px' }}>{product.tag}</h5>
              <h5 style={{ fontSize: '18px' }}> {product.price} Baht</h5>
              <Button hidden={!user || product.qty === 0 || role === 'A'} variant="primary" 
              onClick={() => { addToCart(product.id); handleClickAdd(); handleInserProduct() }}>
                Add to Cart</Button>
              <Button hidden={!user || !(product.qty === 0)} disabled variant="secondary"
                onClick={() => { addToCart(product.id); handleClick(); handleInserProduct() }}>Out of Stock</Button>
              <h5 className="mt-2" style={{ fontSize: '14px', color: 'red' }}> Remaining : {product.qty}</h5>


              <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '0' }}>
                <div className="button-admin">
                  <Button size="sm" style={{ marginRight: '0.5rem' }} hidden={role == 'C' || role == 'N'} onClick={() => setEditProductShow(true)} > Edit </Button>
                  <Button size="sm" variant="danger" onClick={() => setModalShow(true)} hidden={role == 'C' || role == 'N'} > Remove </Button>
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
        </div>
      </MediaQuery>

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



      <Modal className="cart-modal" show={editProductShow}
        onHide={() => setEditProductShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit your address.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>


              <span className="Filename">
                <img src={product.img} width="370px" height="370px" />
              </span>



              {/* <h4> Product Photo</h4>

              <div className="Row">
                <span className="Filename">
                  <img src={product.img} width="100%" />
                </span>
              </div>

              <div className="mt-5">
                <input
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => { handleFileUpload(e); onSelectFile(e) }}
                />
              </div> */}
            </Col>
            <Col>

              <Form className="formSignin" >
                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Product name</Form.Label>
                  <Form.Control type="text" value={product.title} onChange={e => { setProductName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" min={0} value={product.price} onChange={e => { setPrice(e.target.value) }} />
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
                  <Form.Control as="textarea" rows={2} value={product.description} onChange={e => { setDescription(e.target.value) }} />
                </Form.Group>

                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={product.qty} onChange={e => { setQty(e.target.value) }} />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" >
                   Edit this product
                  </Button>

                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

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