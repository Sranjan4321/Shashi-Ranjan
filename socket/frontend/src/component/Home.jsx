import React from 'react';
import Nav from './Nav';
import style from './home.module.css';
import { Route, Routes } from 'react-router';
import Display from './Display';
import Login from './Login';
import AddProduct from './AddProduct';
const Home = () => {
  return (
    <div className={style.main}>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/display" element={<Display />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default Home;
