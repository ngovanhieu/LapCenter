import React from "react";
import "./cardItem.scss";
import { useHistory } from "react-router-dom";

const CardItem = ({ product }) => {
  const history = useHistory();

  const moveToDetail = () => {
    history.push(`/product/${product._id}`);
  };

  return (
    <div
      className="cardItem-container"
      onClick={() => moveToDetail()}
      title={product.name}
    >
      <img
        className="image"
        src={product.images[0]}
      />
      <h4 className="name">{product.name}</h4>
      <p className="price-text">{product.price} VND</p>
    </div>
  );
};

export default CardItem;