import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Table, Segment, Button, Popup, Modal } from "semantic-ui-react";
import "./cart.scss";
import axios from "axios";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("customerName");
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/cart/${userId}`)
      .then(function (response) {
        // handle success
        const data = response.data.products;
        console.log("cart: ", data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const onDelete = () => {
    setLoading(true);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/cart/removeCartInCart/${productId}`
      )
      .then(function (response) {
        setLoading(false);
        setOpen(false);
        setOpenDialog(true);
        setMessage("xóa thành công sản phẩm ra khỏi giỏ hàng !!!");
        fetchAPI();
      })
      .catch(function (error) {
        setLoading(false);
        setOpenDialog(true);
        setMessage("xóa không thành công sản phẩm ra khỏi giỏ hàng !!!");
      });
  };

  return (
    <div>
      <Navbar />
      <Segment loading={loading} className="cart-container">
        <h4>
          Lịch sử mua hàng của <span>{currentUser}</span>
        </h4>
        <div className="cart-content">
          <Table color="green" key="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hình ảnh</Table.HeaderCell>
                <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
                <Table.HeaderCell>Hãng</Table.HeaderCell>
                <Table.HeaderCell>Giá</Table.HeaderCell>
                <Table.HeaderCell>Hành động</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <img className="cart-img" src={item.image} />
                  </Table.Cell>
                  <Table.Cell>
                    <span className="cart-name">{item.productName}</span>
                  </Table.Cell>
                  <Table.Cell>{item.productBrand}</Table.Cell>
                  <Table.Cell>
                    <span style={{ color: "#db2828" }}>{item.price}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Popup
                      content="Xóa"
                      trigger={
                        <Button
                          icon="trash alternate"
                          color="youtube"
                          circular
                          onClick={() =>
                            //  onDelete(item._id)
                            {
                              setProductId(item._id);
                              setOpen(true);
                            }
                          }
                        />
                      }
                    />
                    <Popup
                      content="Mua"
                      trigger={
                        <Button
                          icon="shopping cart"
                          color="facebook"
                          circular
                            // onClick={() => onBuy(item.productId)}
                        />
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Segment>
      <Footer />
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
        </Modal.Actions>
      </Modal>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo </h4>
        </Modal.Header>
        <Modal.Content image>
          <p>Bạn có muốn xóa sản phẩm này không ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>hủy</Button>
          <Button
            color="blue"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            xác nhận{" "}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
export default Cart;
