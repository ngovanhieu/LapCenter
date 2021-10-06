import "./buy.scss";
import Navbar from "../../components/navbar/navbar";
import {
  Segment,
  Button,
  Input,
  Label,
  Form,
  TextArea,
} from "semantic-ui-react";
import React, { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios  from 'axios' ;
import Footer from "../footer/footer";


const Buy = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const id = location.pathname?.split("buy/")[1];
  const [quantity, setQuantity] = useState(1);


  const onChangeInfo = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case "customerName":
        setCustomerName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        setAddress(value);
    }
  };
  useEffect(()=>{
    window.scrollTo(0, 0);
    fetchData();
    
  }, [] )

  let checkInfo = true;
  if (!customerName || !phoneNumber || !email || !address) checkInfo = true;
  if (customerName && phoneNumber && email && address) checkInfo = false;

  const fetchData = () => {
    setLoading(true);
    let url = `https://lap-center.herokuapp.com/api/product/getProductById/${id}`;
    axios
      .get(url)
      .then(function (res) {
        const data = res.data.response;
        setData(data);
        console.log("data", data);
        setImage(data.images[0]);
        console.log("data ", data.images[0]);
      })
      .catch(function (error) {
        console.log("error: ", error);
        setLoading(false);
      });
  };

  const onChange = (number) => {
    setQuantity(number);
    console.log(number);
  };
  const onChangeQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
    } else if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  

  return (
    <div>
      <Navbar />
      <Segment className="buy-container">
        <div className="buy-title">
          <p>Để đặt hàng</p>
          <span>
            , quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc
            và điền các thông tin dưới đây:
          </span>
        </div>
        <div className="buy-content">
          <div className="buy-header">
            <img
              className="buy-image"
              src={image}
              alt=""
            />
            <p>{data.name}</p>
            <div className="quantity">
              <Button
                icon="minus"
                onClick={() => onChangeQuantity("minus")}
              />
              <Input
                className="inp-quantity"
                value={quantity}
                // onChange={(e) => {
                //   onChange(e.target.value);
                // }}
              />
              <Button
                icon="plus"
                onClick={() => onChangeQuantity("plus")}
              />
              <h4>{data.price}</h4>
            </div>
          </div>
          <hr />
          <div className="buy-total">
            <h3>Tổng tiền:</h3>
            <p>{data.price * quantity }</p>
          </div>
          <div className="user-info">
            <Segment raised>
              <Label as="a" color="red" ribbon>
                Thông tin khách hàng
              </Label>
              <Form>
                <Form.Field>
                  <label>{data.customerName}</label>
                  <input
                    placeholder="Ngô Văn Hiếu"
                    value={customerName}
                    onChange={(e) => onChangeInfo(e, "customerName")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>{phoneNumber}</label>
                  <input
                    placeholder="0787314023"
                    value={phoneNumber}
                    onChange={(e) => onChangeInfo(e, "phoneNumber")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>{email}</label>
                  <input
                    placeholder="hieungo30092703@gmail.com"
                    value={email}
                    onChange={(e) => onChangeInfo(e, "email")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>{address}</label>
                  <TextArea
                    placeholder="Tell us more"
                    value={address}
                    onChange={(e) => onChangeInfo(e, "address")}
                  />
                </Form.Field>
                <Button color="red" disabled={checkInfo} className="btn-order">
                  Đặt hàng
                </Button>
              </Form>
            </Segment>
          </div>
        </div>
      </Segment>
      <Footer/>
    </div>
  );
};

export default Buy;
