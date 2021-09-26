import React from 'react';
import logo from '../../assets/imgs/desktop-computer.png';
import './navbar.scss';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const history = useHistory();

  const backToHome = () => {
    history.push("/");
  }

  return (
    <div className="navbar">
      <p className="logo-container">
        <img className="logo" src={logo} onClick={backToHome} />
      </p>
      <div className="options">
        <Link className="option" to="/">
          TRANG CHỦ
        </Link>
        <Link className="option" to="/introduce">
          GIỚI THIỆU
        </Link>
        <Link className="option" to="/contact">
          LIÊN HỆ
        </Link>
        <Link className="option" to="/login">
          ĐĂNG NHẬP
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
