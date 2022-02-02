import React from 'react';
import './index.css';
import App from './App';
import Login from './components/LoginComponent'
import Menu from './components/MenuComponent'
import LineLogin from './components/LineLoginComponent'
import CreateAccount from './components/CreateAccountComponent'
import ContactUs from './components/ContactUsComponent'
import OrderStatus from './components/OrderStatusComponent'
import Profile from './components/Profile'

import reportWebVitals from './reportWebVitals';

import {BrowserRouter , Router , Route ,Link , Routes} from 'react-router-dom'
import {BrowserHistory} from 'react-router'
import ReactDOM , {render} from 'react-dom';
import HomeComponent from './components/HomeComponent';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeComponent />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/menu" element={<Menu />}></Route>
      <Route path="/linelogin" element={<LineLogin />}></Route>
      <Route path="/createaccount" element={<CreateAccount />}></Route>
      <Route path="/contactus" element={<ContactUs />}></Route>
      <Route path="/order" element={<OrderStatus />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
