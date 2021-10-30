import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/navbar";
import {
  Table,
  Segment,
  Button,
  Popup,
  Menu,
  Icon,
  Modal,
  Pagination,
} from "semantic-ui-react";
import "./manageOrder.scss";
import axios from "axios";

const ManageOrder = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderID, setOrderID] = useState([]);
  const [orderStatus, setOrderStatus] = useState(0);
  const [temp, setTemp] = useState([]);


  const [dataItem, setDataItem] = useState([]);

  const fetchData = () => {
    setLoading(true);
    setPageNumber(1);
    axios
      .get("https://lap-center.herokuapp.com/api/order")
      .then(function (response) {
        const data = response.data.orders;
        setPageNumber(1);
        setTotalPage(response.data.totalPage);
        // handle success
        setData(response.data.orders);
        setLoading(false);
        console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false);
      });
  };

  const handlePaginationChange = async ( activePage ) => {
    setTemp(activePage);
    const page = parseInt (activePage.target.innerHTML);
    await setLoading(true);
    await setPageNumber(activePage);
    let url = `https://lap-center.herokuapp.com/api/order?pageNumber=${page}`;
    await axios
      .get(url)
      .then(function (response) {
        // handle success
        window.scrollTo(0, 0);
        setData(response.data.orders);
        setTotalPage(response.data.totalPage);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  //   const convertOrder = (order) => {
  //     return(
  //       order === 1 ?
  //       <span className="case1">Vừa đặt hàng</span> :
  //       order === 2 ?
  //       <span className="case2">Đang giao hàng</span> :
  //       order === 3 ?
  //       <span className="case3">Đã nhận hàng</span> :
  //       <span className="case4">Trả hàng</span>
  //     )
  //   }

  // const convertOrder = (order) => {
  //     switch(order) {
  //       case 1:
  //         return <span className="case1">Vừa đặt hàng</span>
  //       case 2:
  //         return <span className="case2">Đang giao hàng</span>
  //       case 3:
  //         return <span className="case3">Đã nhận hàng</span>
  //       default:
  //         return <span className="case4">Trả hàng</span>
  //     }
  //   }

  const handleSelectChange = (e) => {
    console.log("value: ", parseInt(e.target.value));

    setOrderStatus(parseInt(e.target.value));
  };

  const onOpenDetail = (item) => {
    setDataItem(item);
    setOpen(true);
    setOrderID(item._id);
    setOrderStatus(item.orderStatus);
  };

  const changeOrderStatus = (status) => {
    setLoading(true);
    setOpen(false);
    axios
      .patch(`https://lap-center.herokuapp.com/api/order/editOrderStatus/${orderID}`, {
        orderStatus: orderStatus,
      })
      .then(function (response) {
        console.log(response);
        handlePaginationChange(temp);
        setLoading(false);
        setOpenDialog(true);
        setMessage("Thay đổi trạng trái đơn hàng thành công !!!");
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setOpenDialog(true);
        setMessage(
          "Thay đổi trạng trái đơn hàng thất bại, vui lòng thử lại sau !!!"
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <Segment className="order-container">
        <h1>Quản Lý Đơn Hàng</h1>
        <Table celled color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tên khách hàng</Table.HeaderCell>
              <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
              <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
              <Table.HeaderCell>Trạng thái</Table.HeaderCell>
              <Table.HeaderCell>Hành động</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell>{item.productName}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>
                  {item.orderStatus === 1 ? (
                    <span className="case1">Vừa đặt hàng</span>
                  ) : item.orderStatus === 2 ? (
                    <span className="case2">Đang giao hàng</span>
                  ) : item.orderStatus === 3 ? (
                    <span className="case3">Đã nhận hàng</span>
                  ) : (
                    <span className="case4">Trả hàng</span>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    content="Xem chi tiết"
                    trigger={
                      <Button
                        icon="eye"
                        color="facebook"
                        circular
                        onClick={() => onOpenDetail(item)}
                      />
                    }
                  />
                  <Popup
                    content="Xóa"
                    trigger={
                      <Button
                        icon="trash alternate"
                        color="youtube"
                        circular
                        //   onClick={() => onBuy(item.productId)}
                      />
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Pagination
                  boundaryRange={0}
                  // defaultActivePage={1}
                  activePage={pageNumber}
                  ellipsisItem={true}
                  firstItem={true}
                  lastItem={true}
                  siblingRange={1}
                  totalPages={totalPage}
                  onPageChange={handlePaginationChange.bind(this)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>THÔNG TIN KHÁCH HÀNG</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div className="info-check">
              <p>Tên khách hàng:</p>
              <span>{dataItem.customerName}</span>
            </div>
            <div className="info-check">
              <p>Tên sản phẩm:</p>
              <span>{dataItem.productName}</span>
            </div>
            <div className="info-check">
              <p>Hãng:</p>
              <span>{dataItem.productBrand}</span>
            </div>
            <div className="info-check">
              <p>Số lượng:</p>
              <span> {dataItem.quantity}</span>
            </div>
            <div className="info-check">
              <p>Số điện thoại:</p>
              <span>{dataItem.phone}</span>
            </div>
            <div className="info-check">
              <p>Địa chỉ:</p>
              <span>{dataItem.address}</span>
            </div>
            <div className="info-check">
              <p>Trạng thái đơn hàng:</p>
              <select
                value={orderStatus}
                onChange={(e) => handleSelectChange(e) }
                className="select-status"
              >
                <option value="1">Vừa đặt</option>
                <option value="2">Đang giao</option>
                <option value="3">Đã nhận</option>
                <option value="4">Gửi trả</option>
              </select>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={() => changeOrderStatus()} color="blue">
            Cập nhật
          </Button>
        </Modal.Actions>
      </Modal>
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
    </div>
  );
};

export default ManageOrder;
