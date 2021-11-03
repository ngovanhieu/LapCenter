import React, { useState } from "react";
import { Input, Button ,Icon } from 'semantic-ui-react';
import './login.scss'
// import { useHistory} from "react-router-dom";
import {useHistory} from "react-router-dom"
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";


const axios = require("axios");
const account = { username: 'admin', password: 'admin' };



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);

   
  const handleChange = (e, field) => {
    if(field === 'username') {
      setUsername(e.target.value)
    }
    if(field === 'password') {
      setPassword(e.target.value)
    }
  }

  const onLogin = () => {
    setLoading(true);
    axios.post('https://lap-center.herokuapp.com/api/login', {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log(response);
      setLoading(false);
      history.push('/');
      localStorage.setItem('customerName', response.data.userName);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('isAdmin', response.data.isAdmin);


      

    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
      alert("Sai ten dang nhap hoac mat khau!!!")
    });
  }

  let checkInfo = true;
  if (!username ||  !password  ) checkInfo = true;
  else
    checkInfo = false ;


  return (
    <div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Icon
        className='icon-home' name="home" size="large" inverted circular link
        onClick={() => history.push("/")}
      />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}> Đăng nhập </h1>
          <div className="login-content">
            <label>Email hoặc số điện thoại</label>
            <br />
            <Input placeholder="Username" className="inputText" 
              value={username}
              onChange={(e) => handleChange(e, 'username')} 
            />
            <br />
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />
            <Input placeholder="Password" type="password" className="inputText"
              value={password}
              onChange={(e) => handleChange(e, 'password')}
            />
            <br />
            <Button color="primary" onClick={onLogin} disabled={checkInfo} > 
              Đăng nhập 
            </Button>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              Bạn chưa có tài khoản?{" "}
              <a className="register-text" onClick={() => history.push('/register')}>
                Đăng ký ngay.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
