import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Carousel,
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  NavDropdown,
  Fade,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import NavbarCom from "../Navbar/NavbarComponent";
import axios from "axios";
import Signup from "../Signup/SignupLine";
import MediaQuery from "react-responsive";
import { set } from "mongoose";

const liff = window.liff;

async function isHaveEmail(email) {
  return fetch(' https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/user/isHave/' + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  })
    .then(data => data.json())
}

async function login(user) {

  return fetch(' https://34de-2405-9800-b600-90d4-fcf2-b249-79ac-955f.ngrok.io/api/user/loginbyline/' + user.email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

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

  if (email !== "") {
    const response = login({
      email,
    }).then((data) => {
      if (data.user !== null) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role === "A") {
          window.location.href = "/products";
        } else {
          window.location.href = "/order";
        }
      }
    });
  }

  useEffect(() => {
    liff
      .init({ liffId: "1656735773-AvMkVePR" })
      .then(() => {
        if (liff.isLoggedIn()) {
          const getProfile = liff.getProfile();
          const getDecodedIDToken = liff.getDecodedIDToken();
          const getAccessToken = liff.getAccessToken();

          setName(liff.getProfile.displayName);
          setEmail(liff.getDecodedIDToken().email);

          isHaveEmail(liff.getDecodedIDToken().email)
            .then((data) => setIsHave(data))
            .then(() => setAccessToken(liff.getAccessToken));
        } else {
          liff.login();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [round]);

  useEffect(() => {
    if (isHave === 0 && typeof isHave !== "undefined") {
      setSigninModal(true);
      console.log(email);
      console.log("no account");
    } else if (
      isHave !== 0 &&
      typeof isHave !== "undefined" &&
      typeof email !== "undefined"
    ) {
      console.log(email);

    }
  }, [accessToken]);

  const click = (e) => {
    setRound(1);
  };

  return (
    <div className="page-container">
      <NavbarCom />

      <div className="content-wrap">
        <div hidden={isHave > 0 ? true : false}>
          <MediaQuery minWidth={1224}>

            <div hidden={isHave > 0 ? true : false}>
              <Signup
                signinModal={signinModal}
                email={email}
                accessToken={accessToken}
              ></Signup>
            </div>
          </MediaQuery>

          <MediaQuery maxWidth={1224}>

            <div hidden={isHave > 0 ? true : false}>
              <Signup
                signinModal={signinModal}
                email={email}
                accessToken={accessToken}
              ></Signup>
            </div>
          </MediaQuery>
        </div>
      </div>
    </div>
  );
}
