import React from 'react';
import './Style/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './components/LoginComponent';
import Profile from './components/Profile';

function App() {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Signin />
  }

  return (
    <div className="wrapper">

    </div>
  );
}

export default App;