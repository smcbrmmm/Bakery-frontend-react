import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import './Signup.css'
import MediaQuery from 'react-responsive'

async function signup(user) {
    console.log(user)
    //     return fetch('https://c5bd-2405-9800-b600-698c-5cad-e267-7f49-51f7.ngrok.io/api/products/insert', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         title: product.productName , name : product.productName , price : product.price , qty : product.qty , img : "https://www.mychineserecipes.com/wp-content/uploads/2020/06/Egg-Yolk-Lotus-Paste-Pastry-Recipe.jpg" 
    //         , description : product.description , tag : product.tag
    //       })
    //     })
    //     .then(data => data.json())
    // }
}



export default function SignupLine({ email, signinModal }) {


    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [cfPassword, setCfPassword] = useState();

    const submit = e => {

        const response = signup({
            email, password, cfPassword
        })

        console.log(name)
        console.log(password)
        console.log(cfPassword)
    }

    return (

        <div>


            <MediaQuery minWidth={1224}>
                <Container hidden={!signinModal}>
                    <h1 className=""> Create your Account</h1>

                    <div>
                        <Form className="formSignin" >
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={email} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={e => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={e => { setCfPassword(e.target.value) }} />
                            </Form.Group>


                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" onClick={submit} >
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </MediaQuery>

            <MediaQuery maxWidth={1224}>
                <Container>
                    <h1 className=""> Create your Account</h1>

                    <div>
                        <Form className="formSignin" >
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={email} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={e => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={e => { setCfPassword(e.target.value) }} />
                            </Form.Group>


                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" onClick={submit} >
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </MediaQuery>


        </div>

    )


}

