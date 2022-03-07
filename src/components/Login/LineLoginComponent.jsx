import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
const liff = window.liff

async function isHave(email) {
  console.log(email)
  return fetch('http://localhost:8090/api/user/isHave/' + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({ 
    //   userId: user.id, addressId: orderDetail.addressId, status: "Waiting for payment" 
    // })

  })
  .then(data => data.json())
  .then(data => console.log(data))

  
}


export default function LineLogin() {

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [accessToken, setAccessToken] = useState();
  const [email, setEmail] = useState();
  const [id , setId] = useState();

  var user = {
    id: 3,
    name: "Samut Chouybumrung",
    email: "samut.c@ku.th"
  }

  useEffect(() => {
    liff.init({ liffId: '1656735773-AvMkVePR' })
      .catch(err => { throw err });

    if (liff.isLoggedIn()) {
      const getProfile = liff.getProfile();
      const getDecodedIDToken = liff.getDecodedIDToken();
      const getAccessToken = liff.getAccessToken();

      setName(liff.getProfile.displayName)
      setAccessToken(liff.getAccessToken)
      // setEmail(liff.getDecodedIDToken().email)

      const fetchData = async () => {
        const result = await axios(
          'http://localhost:8090/api/user/isHave/' + liff.getDecodedIDToken().email,
        );
        setId(result.data)
      };
  
      fetchData();

      // setTimeout(() => {
      //   localStorage.setItem('accessToken', accessToken);
      //   localStorage.setItem('user', JSON.stringify(user));
      //   window.location.href = "/order";
      // }, 3000);
    }
    else {
      liff.login();
    }

  }, [])

  const redirect = e => {

    if(id === 0 ) {
      window.location.href = "/products";
    }



    // localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('user', JSON.stringify(user));
    // window.location.href = "/order";

    // setTimeout(() => {
    //     window.location.href = "/order";
    // }, 1000);

}


  return (
    <div className="App">

      <NavbarCom />

      <header className="App-header">
        <div className="support">
          <h1> {accessToken} </h1>
          <h1> {email}</h1>
        </div>

        <Button onClick={redirect}> Confirm </Button>
      </header>
    </div>
  )

}
