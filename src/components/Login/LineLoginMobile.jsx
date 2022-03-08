import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade , Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";

import MediaQuery from 'react-responsive'
import { set } from "mongoose";

const liff = window.liff

async function isHaveEmail(email) {
    return fetch('https://c5bd-2405-9800-b600-698c-5cad-e267-7f49-51f7.ngrok.io/api/user/isHave/' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ 
        //   userId: user.id, addressId: orderDetail.addressId, status: "Waiting for payment" 
        // })

    })
        .then(data => data.json())



}

function SigninModal({ props }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [checkPassword, setCheckPassword] = useState();
    const [name , setName] = useState();


    return (
        <Modal className="cart-modal"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="formSignin" >
                    <Form.Group className="signinInput mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="" value={email}  />
                    </Form.Group>
                    <Form.Group className="signinInput mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="" value={"samut"}  />
                    </Form.Group>
                    <Form.Group className="signinInput mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit">
                            Sign up
                        </Button>

                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


export default function LineLoginMobile() {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [accessToken, setAccessToken] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState();
    const [round, setRound] = useState(0);
    const [isHave , setIsHave] = useState();
    const [signinModalShow, setSigntinModalShow] = useState(false);

    var user = {
        id: 3,
        name: "Samut Chouybumrung",
        email: "samut.c@ku.th"
    }

    useEffect(() => {

        liff.init({ liffId: '1656735773-AvMkVePR' })
            .then(() => {
                if (liff.isLoggedIn()) {

                    const getProfile = liff.getProfile();
                    const getDecodedIDToken = liff.getDecodedIDToken();
                    const getAccessToken = liff.getAccessToken();

                    setName(liff.getProfile.displayName)
                    setEmail(liff.getDecodedIDToken().email)

                    isHaveEmail(liff.getDecodedIDToken().email)
                    .then(data => setIsHave(data))
                    .then(() => setAccessToken(liff.getAccessToken) )
  
                } else {
                    liff.login();
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, [round])


    useEffect(() => {

        if(isHave === 0 && typeof isHave !== 'undefined') {
            setSigntinModalShow(true)
            console.log("no account")
        }else if(isHave !== 0 && typeof isHave !== 'undefined'){
            console.log("has account")
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "/order";
        }

    }, [accessToken])



    const click = e => {
        setRound(1);
    }

    const redirect = e => {

        window.location.href = "/home";

        setTimeout(() => {
            window.location.href = "/lineloginmobile";
        }, 1000);




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

                    <Button onClick={click} hidden={accessToken} > Login </Button>

                    <h1> {accessToken} </h1>
                </div>

                <Button onClick={redirect}> Confirm </Button>
            </header>

            <SigninModal show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
            />

        </div>
    )

}
