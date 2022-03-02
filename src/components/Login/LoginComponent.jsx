import React, { Component, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Nav, NavDropdown, Fade , Button} from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";
import PropTypes from 'prop-types';
import swal from 'sweetalert';

async function loginUser(credentials) {
  return fetch('http://localhost:8090/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}


export default function LoginComponent({ setToken }) {

  const [user, setUser] = useState({ users: [] });

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8090/api/customer',
      );
      setUser({
        users: result.data
      });
    };

    fetchData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: true,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/order";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  }

  return (
    <div className="App">

      <NavbarCom />

      <Container>
        <h1 className="main" style={{ textAlign: 'center' }}>  Sign in </h1>
        <h3 className="main" style={{ textAlign: 'center' }}>  with </h3>

        <Row>
          <Col></Col>
          <Col>
            <Form className="formSignin" onSubmit={handleSubmit}>
              <Form.Group className="signinInput mb-3" controlId="formBasicEmail" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="signinInput mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link className="linkToCreateAccount" to='/linelogin'><h5 className="createAccount" style={{ fontSize: '16px' }}> <img src="https://img.icons8.com/fluency/32/000000/line-me.png"></img>
              Sign in with Line.</h5></Link>
            <Link className="linkToCreateAccount" to='/createaccount'><h5 className="createAccount"> Create an account.</h5></Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )

}
