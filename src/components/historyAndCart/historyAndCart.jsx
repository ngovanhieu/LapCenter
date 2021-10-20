import React from "react";
import "./historyAndCart.scss";
import { Button, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function HistoryAndCart() {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const moveToHistory = () => {
    history.push(`/history/${userId}`);
  };
  const moveToCart = () => {
    history.push(`/cart/${userId}`);
  };
  return (
    <div>
      <div className="historyIcon">
        <Popup
          content="Lịch sử mua hàng"
          trigger={
            <Button
              icon="history"
              color="green"
              circular
              onClick={moveToHistory}
            />
          }
        />
      </div>
      <div className="cartIcon">
        <Popup
          content="Giỏ hàng của bạn"
          trigger={
            <Button
              icon="shopping cart"
              color="youtube"
              circular
              onClick={moveToCart}
            />
          }
          position="bottom left"
        />
      </div>
      <p className="numberCart">1</p>
    </div>
  );
}

export default HistoryAndCart;