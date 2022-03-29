import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Card, Row, Col, Table } from "react-bootstrap";
import NavbarCom from '../Navbar/NavbarComponent'
import './Signup.css'
import MediaQuery from 'react-responsive'

async function signup(user) {
    console.log(user)
    return fetch(' https://e4a1-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, name: user.name, accessToken: user.accessToken })
    })
        .then(data => data.json())
}



export default function SignupLine({ email, signinModal, accessToken }) {

    const [name, setName] = useState();
    const [password, setPassword] = useState("samut123");
    const [cfPassword, setCfPassword] = useState();

    if(email === 'undefined'){
        console.log(email)
        window.location.reload()
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await signup({
            email, password, name, accessToken
        });


        if ('accessToken' in response) {
            swal("Success", response.message, "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {
                    localStorage.setItem('accessToken', response['accessToken']);
                    localStorage.setItem('user', JSON.stringify(response['user']));
                    window.location.href = "/products";
                });
        } else {
            swal("Failed", response.message, "error");
        }

    }




    return (

        <div>


            <MediaQuery minWidth={1224}>
                <Container hidden={!signinModal}>
                    <h2 className="" style={{ textAlign: 'center' , marginBottom :'2rem'}}> Create your account</h2>

                    <MediaQuery minWidth={1224} >
                        <div style={{ display : 'flex' , justifyContent:'center' , justifyItems : 'center'}}>
                            <div style={{ width: "40%" }}>

                                <Form className="formSignin" >
                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" value={email} disabled />
                                    </Form.Group>
                                    <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" onChange={e => { setName(e.target.value) }} />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="primary" size="lg" onClick={handleSubmit} >
                                            Sign up
                                        </Button>
                                    </div>
                                </Form>

                            </div>
                        </div>
                    </MediaQuery>

                    <MediaQuery maxWidth={1224} >
                        <div>

                            <Form className="formSignin" >
                                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" value={email} disabled />
                                </Form.Group>
                                <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" onChange={e => { setName(e.target.value) }} />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" size="lg" onClick={handleSubmit} >
                                        Sign up
                                    </Button>
                                </div>
                            </Form>

                        </div>
                    </MediaQuery>

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
                            {/* <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={e => { setCfPassword(e.target.value) }} />
                            </Form.Group> */}


                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" onClick={handleSubmit} >
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

