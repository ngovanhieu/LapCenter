import React from "react";
import { Button, Icon } from "semantic-ui-react";
import "./card.scss";
import {useHistory} from "react-router-dom"
const axios = require("axios");

const Card = (props) => {
  const history=useHistory();
  const item = props.product;
  const moveToDetail = ()=> {
    history.push(`/product/${item._id}`);
    console.log('item id: ', item._id);
  }
  return (
    <div className="card-container" onClick={() => {}} onClick={moveToDetail}>
      <img className="image" src={item.images[0]} />
      <h4 className="name">{item.name}</h4>
      <p className="email d-flex">
        Hãng:{" "}
        <span className="ml-1 text-success font-weight-bold">{item.brand}</span>
      </p>
      <p className="email name d-flex">
        Chip xử lý:{" "}
        <span className="ml-1 text-success font-weight-bold  ">{item.cpu}</span>
      </p>
      <p className="email d-flex">
        Price:{" "}
        <span className="ml-1 text-success font-weight-bold">
          {item.price} VND
        </span>
      </p>
      {/* <button onClick={() => { }} className="btn-success">
            Mua ngay
          </button> */}
      <Button onClick={moveToDetail} color="green">
        <Icon name="eye" /> Xem sản phẩm
      </Button>
    </div>
  );
};

export default Card;
