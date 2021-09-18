import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Input, Button } from 'semantic-ui-react';
import "./register.scss"
// import { useHistory} from "react-router-dom";
import {useHistory} from "react-router-dom"


const account = { username: 'admin', password: 'admin' };

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cfpassword, setcfPassword] = useState('');
  const history = useHistory();
   
  const handleChange = (e, field) => {
    if(field === 'username') {
      setUsername(e.target.value)
    }
    if(field === 'password') {
      setPassword(e.target.value)
    }
    if(field === "cfpassword") {
        setcfPassword(e.target.value) 
    }
  }

  const onRegister = () => {
    console.log(username, password);
    if (password === cfpassword) {
      console.log("dang ky thanh cong");
      history.push("/login");
    } else {
      console.log("dang ky that bai");
      alert("Mat khau khong trung khop!!!");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}> Đăng Ký </h1>
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
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />
        
             <Input placeholder="Password" type="password" className="inputText"
              value={cfpassword}
              onChange={(e) => handleChange(e, 'cfpassword')}
            />
            <br />
            <Button color="green" onClick={onRegister}> 
              Đăng Ký
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
