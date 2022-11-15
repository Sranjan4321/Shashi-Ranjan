import React from 'react';
import { useNavigate } from 'react-router';
import style from './home.module.css';
const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className={style.nav}>
      <h3>Navbar</h3>
      <button onClick={() => navigate('/')}>Login/SignUp</button>
      <button onClick={() => navigate('/addproduct')}>
        Add Sailed Products
      </button>
      <button onClick={() => navigate('/display')}>Sell Bar</button>
    </div>
  );
};

export default Nav;
