import React from 'react';
import './index.css';
import App from './App';
import Login from './components/Login/LoginComponent'
import Menu from './components/Menu/MenuComponent'
import LineLogin from './components/Login/LineLoginComponent'
import CreateAccount from './components/CreateAccountComponent'
import ContactUs from './components/ContactUs/ContactUsComponent'
import OrderStatus from './components/Order/Orders'
import Profile from './components/Profile/Profile'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import reportWebVitals from './reportWebVitals';
import Responsive from './components/Responsive'
import LineLoginMobile from './components/Login/LineLoginMobile'

import { BrowserRouter, Router, Route, Link, Routes } from 'react-router-dom'
import ReactDOM, { render } from 'react-dom';


import { Provider } from 'react-redux'
import store from "./redux/store"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/linelogin" element={<LineLogin />}></Route>
        <Route path="/createaccount" element={<CreateAccount />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/order" element={<OrderStatus />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/responsive" element={<Responsive />}></Route>
        <Route path="/lineloginmobile" element={<LineLoginMobile />}></Route>
      </Routes>
    </BrowserRouter>

    <Footer />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
