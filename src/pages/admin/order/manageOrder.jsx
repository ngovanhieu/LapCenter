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
import { useHistory, useLocation } from "react-router";

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
  const [openRemove, setOpenRemove] = useState(false);
  const [productId, setProductId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [isUserRole, setIsUserRole] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin");
  const history = useHistory();
  const location = useLocation ()




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

  const handlePaginationChange = async (activePage) => {
    setTemp(activePage);
    const page = parseInt(activePage?.target?.innerHTML);
    await setLoading(true);
    await setPageNumber(activePage);
    let url = "";
    if (pageNumber === 1) {
      url = `https://lap-center.herokuapp.com/api/order?pageNumber=1`;
    } else {
      url = `https://lap-center.herokuapp.com/api/order?pageNumber=${page}`;
    }

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
  const onDelete = () => {
    setLoading(true);
    setIsDelete(false);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/order/removeOrder/${orderID}`
      )
      .then(function (response) {
        setLoading(false);
        setOpenDialog(true);
        setMessage("X??a th??nh c??ng s???n ph???m kh???i danh s??ch!!!");
        handlePaginationChange(temp);
      })
      .catch(function (error) {
        setLoading(false);
        setOpenDialog(true);
        setMessage("X??a kh??ng th??nh c??ng s???n ph???m kh???i danh s??ch!!!");
      });
  };

  //   const convertOrder = (order) => {
  //     return(
  //       order === 1 ?
  //       <span className="case1">V???a ?????t h??ng</span> :
  //       order === 2 ?
  //       <span className="case2">??ang giao h??ng</span> :
  //       order === 3 ?
  //       <span className="case3">???? nh???n h??ng</span> :
  //       <span className="case4">Tr??? h??ng</span>
  //     )
  //   }

  // const convertOrder = (order) => {
  //     switch(order) {
  //       case 1:
  //         return <span className="case1">V???a ?????t h??ng</span>
  //       case 2:
  //         return <span className="case2">??ang giao h??ng</span>
  //       case 3:
  //         return <span className="case3">???? nh???n h??ng</span>
  //       default:
  //         return <span className="case4">Tr??? h??ng</span>
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
      .patch(
        `https://lap-center.herokuapp.com/api/order/editOrderStatus/${orderID}`,
        {
          orderStatus: orderStatus,
        }
      )
      .then(function (response) {
        console.log(response);
        handlePaginationChange(temp);
        setLoading(false);
        setOpenDialog(true);
        setMessage("Thay ?????i tr???ng tr??i ????n h??ng th??nh c??ng !!!");
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setOpenDialog(true);
        setMessage(
          "Thay ?????i tr???ng tr??i ????n h??ng th???t b???i, vui l??ng th??? l???i sau !!!"
        );
      });
  };
  const onOpenDelete = (item) => {
    setMessage("B???n c?? ch???c ch???n mu???n x??a ????n h??ng n??y?")
    setOpenDialog(true);
    setOrderID(item._id);
    setIsDelete(true);
  };

  

  useEffect(() => {
    if(isAdmin === "undefined" || isAdmin === "false") {
      setOpenDialog(true)
      setMessage("B???n kh??ng th??? truy c???p v??o ?????a ch??? n??y. Vui l??ng quay l???i trang ch???!!!");
      setIsUserRole(true);
    } else {
      fetchData();
    } 
  }, [location]);
  return (
    <div>
      <Navbar />
      <Segment loading={loading} className="order-container">
        <h1>Qu???n L?? ????n H??ng</h1>
        <Table celled color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>T??n kh??ch h??ng</Table.HeaderCell>
              <Table.HeaderCell>T??n s???n ph???m</Table.HeaderCell>
              <Table.HeaderCell>S??? ??i???n tho???i</Table.HeaderCell>
              <Table.HeaderCell>Tr???ng th??i</Table.HeaderCell>
              <Table.HeaderCell>H??nh ?????ng</Table.HeaderCell>
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
                    <span className="case1">V???a ?????t h??ng</span>
                  ) : item.orderStatus === 2 ? (
                    <span className="case2">??ang giao h??ng</span>
                  ) : item.orderStatus === 3 ? (
                    <span className="case3">???? nh???n h??ng</span>
                  ) : (
                    <span className="case4">Tr??? h??ng</span>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    content="Xem chi ti???t"
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
                    content="X??a"
                    trigger={
                      <Button
                        icon="trash alternate"
                        color="youtube"
                        circular
                          onClick={() => onOpenDelete(item) }
                        // onClick={() => {
                        //   // setProductId(item._id);
                        //   // setOpenRemove(true);
                          
                        // }}
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
        <Modal.Header>TH??NG TIN KH??CH H??NG</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div className="info-check">
              <p>T??n kh??ch h??ng:</p>
              <span>{dataItem.customerName}</span>
            </div>
            <div className="info-check">
              <p>T??n s???n ph???m:</p>
              <span>{dataItem.productName}</span>
            </div>
            <div className="info-check">
              <p>H??ng:</p>
              <span>{dataItem.productBrand}</span>
            </div>
            <div className="info-check">
              <p>S??? l?????ng:</p>
              <span> {dataItem.quantity}</span>
            </div>
            <div className="info-check">
              <p>S??? ??i???n tho???i:</p>
              <span>{dataItem.phone}</span>
            </div>
            <div className="info-check">
              <p>?????a ch???:</p>
              <span>{dataItem.address}</span>
            </div>
            <div className="info-check">
              <p>Tr???ng th??i ????n h??ng:</p>
              <select
                value={orderStatus}
                onChange={(e) => handleSelectChange(e)}
                className="select-status"
              >
                <option value="1">V???a ?????t</option>
                <option value="2">??ang giao</option>
                <option value="3">???? nh???n</option>
                <option value="4">G???i tr???</option>
              </select>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>H???y</Button>
          <Button onClick={() => changeOrderStatus()} color="blue">
            C???p nh???t
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
          <h4 className="txt-check">Th??ng b??o</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
        {!isUserRole && 
            <Button onClick={() => {setOpenDialog(false); setIsDelete(false)}}>{isDelete ? "H???y" : "????ng"}</Button>
          }
          {isDelete &&
            <Button onClick={() => onDelete()} color="blue">X??c nh???n</Button>
          }
          {isUserRole &&
            <Button onClick={() => {history.push(""); setOpenDialog(false)}} color="blue">Trang ch???</Button>
          }
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ManageOrder;
