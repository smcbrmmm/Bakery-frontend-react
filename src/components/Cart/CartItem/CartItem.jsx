import React, { useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../../redux/Shopping/shopping-actions";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function deleteItemInCart(cartItem) {
  console.log(cartItem)
  return fetch('https://89f8-2405-9800-b600-ae29-bcec-fb42-ab8b-4bcd.ngrok.io/api/cart/inCart/deleteItemInCart', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: cartItem.userId, productId: cartItem.productId
    })
  })
  // .then(data => data.json())
}


const CartItem = ({ item, adjustQty, removeFromCart }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [userId, setUserId] = useState(user ? user.id : 100);
  const [productId, setProductId] = useState(item.id);


  const [input, setInput] = useState(item.qty);

  const [open, setOpen] = React.useState(false);

  const show = () => {
    setOpen(true)
  }

  const handleClick = (id) => {
    setTimeout(() => {
      show()

      removeFromCart(id)
    }, 1000)
  };

  const handleDeletItemInCart = async e => {

    const response = await deleteItemInCart({
      userId, productId
    });

    // setTimeout(() => {
    //   window.location.href = "/products";
    // }, 1000);

  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
  };

  return (
    <div className="main">

      <div className="container">

        <Row>
          <Col>
            <img className="main" src={item.img} alt={item.title} style={{ width: '70%' }} />
            <h5 className="main" style={{ textAlign: 'center' }}>{item.title}</h5>
            
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5"> <h3> Quantity </h3> <Button  variant="danger" size="sm" onClick={() => { handleClick(item.id); handleDeletItemInCart() }} > Delete </Button> </Form.Label>
            <Form.Control
              type="number"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              min={1}
              onChange={onChangeHandler}
              value={input}
            />
            <h5> $ {item.price} </h5>
          </Col>
          {/* <Col>
              <Button  onClick={() => { handleClick(item.id); handleDeletItemInCart() }} > Delete </Button>
          </Col> */}

        </Row>


        {/* <div className="main">
          <div className="main">
            <label htmlFor="qty">Qty</label>
            <input
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={input}
              onChange={onChangeHandler}
            />
          </div>
          <button
            onClick={() => { handleClick(item.id); handleDeletItemInCart() }}
            className="main"
          >
            delete
          </button>
        </div> */}

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Product already remove from your cart.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
