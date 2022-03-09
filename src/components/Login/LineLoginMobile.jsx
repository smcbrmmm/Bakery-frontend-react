import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
import Signup from "../Signup/SignupLine"
import MediaQuery from 'react-responsive'
import { set } from "mongoose";

const liff = window.liff

async function isHaveEmail(email) {
    return fetch('https://e226-2405-9800-b600-698c-6999-9220-373e-e462.ngrok.io/api/user/isHave/' + email, {
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

async function login(user) {
    
    return fetch('https://e226-2405-9800-b600-698c-6999-9220-373e-e462.ngrok.io/api/user/loginbyline/' + user.email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ email: user.email})
    })
        .then(data => data.json())
}


export default function LineLoginMobile() {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [accessToken, setAccessToken] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState();
    const [round, setRound] = useState(0);
    const [isHave, setIsHave] = useState();
    const [signinModal, setSigninModal] = useState(false);

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
                        .then(() => setAccessToken(liff.getAccessToken))

                } else {
                    liff.login();
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, [round])


    useEffect(() => {

        if (isHave === 0 && typeof isHave !== 'undefined') {
            setSigninModal(true)
            console.log(email)
            console.log("no account")
        } else if (isHave !== 0 && typeof isHave !== 'undefined' && typeof email !== 'undefined') {
            // console.log(isHave)
            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('user', JSON.stringify(user));
            // window.location.href = "/order";
            console.log(email)
            const response = login({
                email
            })
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = "/order";
            })

            // if ('accessToken' in response) {
            //     swal("Success", response.message, "success", {
            //         buttons: false,
            //         timer: 2000,
            //     })
            //         .then((value) => {
            //             localStorage.setItem('accessToken', response['accessToken']);
            //             localStorage.setItem('user', JSON.stringify(response['user']));
            //             window.location.href = "/order";
            //         });
            // } else {
            //     swal("Failed", response.message, "error");
            // }
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
        <div className="page-container">

            <NavbarCom />

            <div className="content-wrap">

                <div hidden={isHave > 0 ? true : false}>
                    <MediaQuery minWidth={1224}>
                        <Button onClick={click} hidden={accessToken} > LOGIN </Button>
                        <Signup signinModal={signinModal} email={email}>
                        </Signup>
                    </MediaQuery>

                    <MediaQuery maxWidth={1224}>
                        {/* <Button onClick={click} hidden={accessToken} > Create your account. </Button> */}
                        <div hidden={isHave > 0 ? true : false}>
                            <Signup signinModal={signinModal} email={email}>
                            </Signup>
                        </div>
                    </MediaQuery>
                </div>




            </div>

        </div>
    )

}


