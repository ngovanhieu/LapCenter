import React from 'react';
import logo from '../../assets/imgs/desktop-computer.png';
import './navbar.scss';
import { Link } from 'react-router-dom'

const Navbar = (props) => (
    <div className='navbar'>
        <p className='logo-container'>
            <img className='logo' src={logo}/>
        </p>
        <div className='options'>
            <Link className='option' to='/'>
                TRANG CHỦ
            </Link>
            <Link className='option' to='/introduce' >
                GIỚI THIỆU
            </Link>
            <Link className='option' to='/contact' >
                LIÊN HỆ
            </Link>
            <Link className='option' to='/login'>
                Đăng Nhập
            </Link>
        </div>
    </div>
)

export default Navbar;