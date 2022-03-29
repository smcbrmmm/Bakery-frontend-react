import React, { useState  , useEffect} from "react";

import {   Form,  Button, Row, Col ,  } from "react-bootstrap";

import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../../redux/Shopping/shopping-actions";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MediaQuery from 'react-responsive'

import axios from "axios";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function deleteItemInCart(cartItem) {
  console.log(cartItem)
  return fetch(' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/cart/inCart/deleteItemInCart', {
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

  const [maxQty , setMaxQty] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
          ' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/products/getProductQty/' + item.id ,
      );
      
      setMaxQty(result.data)
      // console.log(result.data)
  };

    fetchData();
  }, [])



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onChangeHandler = (e) => {
    console.log(maxQty)
    console.log(e.target.value)
    if(e.target.value > maxQty){
      swal("Error", "Quantity more than max quantity.", "error");
    }else{
      setInput(e.target.value);
      adjustQty(item.id, e.target.value);
    }

  };

  return (
    <div className="main">

      <div className="container">

        <Row>
          <Col style={{ textAlign: 'center' }}>
            <img className="main" src={item.img} alt={item.title} style={{ width: '60%' }} />


            <MediaQuery minWidth={1224}>
              <h5 className="main" style={{marginTop:'1rem'}} >{item.title}</h5>
              <h5>  {item.price} Baht </h5>
            </MediaQuery>

            <MediaQuery maxWidth={1224}>
              <h5 className="main" style={{ fontSize: '14px' , marginTop : '1rem' }} >{item.title}</h5>
              <h5 style={{ fontSize: '12px' }}>  {item.price} Baht </h5>
            </MediaQuery>

          </Col>
          <Col>

            <MediaQuery minWidth={1224}>
              <Form.Label htmlFor="inputPassword5"> <h4> Quantity <Button variant="danger" size="sm" onClick={() => { handleClick(item.id); handleDeletItemInCart() }} > <DeleteForeverIcon></DeleteForeverIcon> </Button> </h4>   </Form.Label>
              <Form.Control
                type="number"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                min={1}
                max={maxQty}
                onChange={onChangeHandler}
                value={input}
                style={{ width: '70%' }}
              />
              
            </MediaQuery>

            <MediaQuery maxWidth={1224}>
              <Form.Label htmlFor="inputPassword5">
                <h5 style={{fontSize : '14px' }}> Quantity <Button variant="danger" size="sm" onClick={() => { handleClick(item.id); handleDeletItemInCart() }} > <DeleteForeverIcon></DeleteForeverIcon> </Button> </h5>
              </Form.Label>
              <Form.Control
                type="number"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                min={1}
                max={maxQty}
                onChange={onChangeHandler}
                value={input}
                style={{ width: '70%' }}
              />
              <br></br>
              
            </MediaQuery>

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
