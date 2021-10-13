import React, { useState } from "react";
import { Input, Button, Icon,Modal } from "semantic-ui-react";
import "./register.scss";
// import { useHistory} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import axios from "axios";

const account = { username: "admin", password: "admin" };

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setcfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  const handleChange = (e, field) => {
    if (field === "name") {
      setName(e.target.value);
    }
    if (field === "phone") {
      setPhone(e.target.value);
    }
    if (field === "email") {
      setEmail(e.target.value);
    }
    if (field === "password") {
      setPassword(e.target.value);
    }
    if (field === "cfpassword") {
      setcfPassword(e.target.value);
    }
  };

  const onRegister = () => {
    if (password === cfpassword) {
      setLoading(true);
      axios
        .post("https://lap-center.herokuapp.com/api/register", {
          name: name,
          email: email,
          phone: phone,
          password: password,
        })
        .then(function (res) {
          setOpenDialog(true);
          setMessage('Đặt ký thành công !!!');
          setLoading(false);
        })
        .catch(function (err) {
          setLoading(false);
          setOpenDialog(true);
          setMessage('Đăng Ký tài khoản không thành công. vui lòng thử lại!!!');

        });
    } else {
      setOpenDialog(true);
      setMessage("Mật Khẩu không đúng vùi lòng thử lại sau   ");
    }
  };

  let checkInfo = true;
  if (!name || !phone || !email || !password || !cfpassword) checkInfo = true;
  else checkInfo = false;
  // if (customerName && phoneNumber && email && address) checkInfo = false;

  return (
    <div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Icon
        className="icon-home"
        name="home"
        size="large"
        inverted
        circular
        link
        onClick={() => history.push("/")}
      />
      <div className="register-container">
        <div className="register-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            Đăng Ký{" "}
          </h1>
          <div className="register-content">
            <label>Tên người dùng</label>
            <br />
            <Input
              placeholder="Tên người dùng"
              className="inputText"
              value={name}
              onChange={(e) => handleChange(e, "name")}
            />
            <label> Email </label>
            <br />
            <Input
              placeholder="Email"
              className="inputText"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />
            <label>Số điện thoại</label>
            <br />
            <Input
              placeholder="số điện thoại"
              className="inputText"
              type="number"
              value={phone}
              onChange={(e) => handleChange(e, "phone")}
            />
            <br />
            <label style={{ marginTop: "10px" }}>Mật Khẩu</label>
            <br />
            <Input
              placeholder="Mật Khẩu"
              type="password"
              className="inputText"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />

            <Input
              placeholder="Nhập lại mật khẩu"
              type="password"
              className="inputText"
              value={cfpassword}
              onChange={(e) => handleChange(e, "cfpassword")}
            />
            <br />
            <Button color="primary" onClick={onRegister} disabled={checkInfo}>
              Đăng Ký
            </Button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Bạn đã có tài khoản.{" "}
              <a className="login-text" onClick={() => history.push("login")}>
                Đăng nhập.
              </a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpenDialog(false)}
        onOpen={() => setOpenDialog(true)}
        open={openDialog}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
          {password === cfpassword && 
          
          <Button positive onClick={() => (history.push("/login"), setOpenDialog(false))}>
            Đăng nhập
          </Button>
          }
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Register;
