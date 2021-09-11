import React from 'react';
import logo from '../../assets/imgs/desktop-computer.png';
import './navbar.scss';

const Navbar = (props) => (
    <div className='navbar'>
        <p className='logo-container'>
            <img className='logo' src={logo}/>
        </p>
        <div className='options'>
            <a className='option'>
                TRANG CHỦ
            </a>
            <a className='option'>
                GIỚI THIỆU
            </a>
            <a className='option'>
                LIÊN HỆ
            </a>
            <a className='option'>
                PHẢN HỒI
            </a>
        </div>
    </div>
)

export default Navbar;