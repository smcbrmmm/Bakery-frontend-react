import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import NavbarCom from '../Navbar/NavbarComponent'

const liff = window.liff

export default function LineLogin() {

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [accessToken , setAccessToken] = useState();
  const [email , setEmail] = useState();

  var user = {
    id:"3",
    name : "Samut Chouybumrung",
    email : "samut.c@ku.th"
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

      console.log(name)
      
      setTimeout(() => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "/order";
      }, 3000);
    }
    else {
      liff.login();
    }

  }, [])

  const redirect = () => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "/order";
  }

  return (
    <div className="App">

      <NavbarCom />

      <header className="App-header">
        <div className="support">
          <h1> {accessToken} </h1>
        </div>

        <Button onClick={redirect}> Confirm </Button>
      </header>
    </div>
  )

}
