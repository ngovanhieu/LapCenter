import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Input, Button } from 'semantic-ui-react';
import './login.scss'
// import { useHistory} from "react-router-dom";
import {useHistory} from "react-router-dom"


const account = { username: 'admin', password: 'admin' };

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
   
  const handleChange = (e, field) => {
    if(field === 'username') {
      setUsername(e.target.value)
    }
    if(field === 'password') {
      setPassword(e.target.value)
    }
  }

  const onLogin = () => {
    console.log(username, password);
    if(username === account.username && password === account.password){
        console.log('dang nhap thanh cong');
        // alert('Dang nhap thanh cong')
        history.push('/');
    }else{
        console.log('dang nhap that bai');
        alert('moi ban nhap lai, ban nhap sai roi')
    }
  }


  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}> Đăng nhập </h1>
          <div className="login-content">
            <label>Tên đăng nhập</label>
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
            <Button color="green" onClick={onLogin}> 
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
