import React, { Component, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Nav, NavDropdown, Fade , Button} from "react-bootstrap";
import NavbarCom from './NavbarComponent'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";
import PropTypes from 'prop-types';
import swal from 'sweetalert';

// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';

async function loginUser(credentials) {
  return fetch('http://localhost:8090/api/users/login', {
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


// import React, { useState } from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import swal from 'sweetalert';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//   },
//   image: {
//     backgroundImage: 'url(https://source.unsplash.com/random)',
//     backgroundSize: 'cover',
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// async function loginUser(credentials) {
//   return fetch('http://localhost:8090/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
  
// }

// export default function Signin() {
//   const classes = useStyles();
//   const [username, setUserName] = useState();
//   const [password, setPassword] = useState();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const response = await loginUser({
//       username,
//       password
//     });
//     if ('accessToken' in response) {
//       swal("Success", response.message, "success", {
//         buttons: false,
//         timer: 2000,
//       })
//         .then((value) => {
//           localStorage.setItem('accessToken', response['accessToken']);
//           localStorage.setItem('user', JSON.stringify(response['user']));
//           window.location.href = "/menu";
//         });
//     } else {
//       swal("Failed", response.message, "error");
//     }
//   }

//   return (
//     <Grid container className={classes.root}>
//       <CssBaseline />
//       <Grid item xs={false} md={7} className={classes.image} />
//       <Grid item xs={12} md={5} component={Paper} elevation={6} square>
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className={classes.form} noValidate onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               name="email"
//               label="Email Address"
//               onChange={e => setUserName(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="password"
//               name="password"
//               label="Password"
//               type="password"
//               onChange={e => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign In
//             </Button>
//           </form>
//         </div>
//       </Grid>
//     </Grid>
//   );
// }