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

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function deleteProduct(product) {
  
  return fetch(' https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/products/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: product.productId
    })
  })

}

async function insertProduct(product) {
  
  return fetch(' https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/cart/inCart/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: product.userId, productId: product.productId, qty: 1
    })
  })

}

async function updateProduct(product) {
  
  return fetch(' https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/products/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: product.productName, price: product.price, qty: product.qty
      , img: product.postImage.myFile
      , description: product.description, tag: product.tag, id: product.productId
    })
  })
    .then(data => data.json())
}


const Product = ({ product, addToCart, loadCurrentItem, hid }) => {


  const user = JSON.parse(localStorage.getItem('user'));

  const [userId, setUserId] = useState(user ? user.id : 100);

  const [role, setRole] = useState(user ? user.role : 'N')

  const [open, setOpen] = React.useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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

  const handleUpdateModal = () => {
    setOpenUpdateModal(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenAddModal(false)
    setOpenUpdateModal(false)
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

  }

  const [productName, setProductName] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [tag, setTag] = useState(product.tag);
  const [description, setDescription] = useState(product.description);
  const [qty, setQty] = useState(product.qty);

  const [postImage, setPostImage] = useState({
    myFile: product.img,
  });

  const validationEditForm = () => {
    if (typeof productName === "undefined" || typeof price === "undefined" || typeof tag === "undefined" || typeof description === "undefined"
      || typeof qty === "undefined"
      || productName === "" || price === "" || tag === "" || description === "" || qty === "" || postImage.myFile === ""
    ) {
      swal("Error", "Please fill your information completely", "error");
    } else {
      handleUpdateProduct()
      handleUpdateModal()
    }

  }

  const handleUpdateProduct = async e => {

    const response = await updateProduct({
      productName, price, tag, description, qty, postImage, productId
    });

    setTimeout(() => {
      window.location.href = "/products";
    }, 1000);

  }


  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    let allfiles = []

    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile(allfiles);
    }
    console.log(files)
  }



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
          <Tooltip title={<h5 style={{ fontSize: '16px' }}> {longText} </h5>} placement="bottom">
            <Card.Img variant="top" style={{ width: '287px', height: '250px' }}
              src={product.img} />
          </Tooltip>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <h5 style={{ fontSize: '14px' }}>{product.tag}</h5>
            <h5 style={{ fontSize: '18px' }}> {product.price} Baht</h5>
            <Button hidden={!user || product.qty === 0 || role === 'A'} variant="primary" 
            onClick={() => { addToCart(product.id); handleClickAdd(); handleInserProduct() }}>Add to Cart <AddShoppingCartIcon></AddShoppingCartIcon> </Button>
            <Button hidden={!user || !(product.qty === 0) || role === 'A'} disabled variant="secondary"
              onClick={() => { addToCart(product.id); handleClick(); handleInserProduct() }}>Out of Stock</Button>
            <h5 className="mt-2" style={{ fontSize: '14px', color: 'red' }}> Remaining : {product.qty} Boxes</h5>


            <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '0' }}>
              <div className="button-admin">
                <Button size="sm" style={{ marginRight: '0.5rem' }} hidden={role == 'C' || role == 'N'} 
                onClick={() => setEditProductShow(true)} > <EditIcon></EditIcon> </Button>
                <Button size="sm" variant="danger" onClick={() => setModalShow(true)} 
                hidden={role == 'C' || role == 'N'} > <DeleteOutlineIcon></DeleteOutlineIcon> </Button>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: '18rem', display: 'flex', marginBottom: '1rem' }}>

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
                Add to Cart <AddShoppingCartIcon></AddShoppingCartIcon> </Button>
              <Button hidden={!user || !(product.qty === 0)} disabled variant="secondary"
                onClick={() => { addToCart(product.id); handleClick(); handleInserProduct() }}>Out of Stock</Button>
              <h5 className="mt-2" style={{ fontSize: '14px', color: 'red' }}> Remaining : {product.qty}</h5>


              <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '0' }}>
                <div className="button-admin">
                  <Button size="sm" style={{ marginRight: '0.5rem' }} hidden={role == 'C' || role == 'N'} onClick={() => setEditProductShow(true)} > <EditIcon></EditIcon> </Button>
                  <Button size="sm" variant="danger" onClick={() => setModalShow(true)} hidden={role == 'C' || role == 'N'} > <DeleteOutlineIcon> </DeleteOutlineIcon></Button>
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
          Product has been deleted from your shop.
        </Alert>
      </Snackbar>

      <Snackbar open={openAddModal} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Product has been added to your cart.
        </Alert>
      </Snackbar>

      <Snackbar open={openUpdateModal} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Product has been edited.
        </Alert>
      </Snackbar>



      <Modal className="cart-modal2" show={editProductShow}
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


              <span className="Filename" style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                <img src={product.img} width="370px" height="370px" />
              </span>

            </Col>
            <Col>

              <Form className="formSignin" >
                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Product name</Form.Label>
                  <Form.Control type="text" defaultValue={product.title} onChange={e => { setProductName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" min={0} defaultValue={product.price} onChange={e => { setPrice(e.target.value) }} />
                </Form.Group>
                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Tag</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={e => { setTag(e.target.value) }} >
                    <option value={product.tag}>{product.tag}</option>
                    <option value="Pastry" hidden={product.tag === "Pastry"}>Chinese Pastry</option>
                    <option value="Roasted Pastry" hidden={product.tag === "Roasted Pastry"}>Roasted Chinese Pastry</option>
                    <option value="Rice Cracker" hidden={product.tag === "Rice Cracker"}>Rice Cracker </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2} defaultValue={product.description} onChange={e => { setDescription(e.target.value) }} />
                </Form.Group>

                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" defaultValue={product.qty} onChange={e => { setQty(e.target.value) }} />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={() => { validationEditForm() }}>
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