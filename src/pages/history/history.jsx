import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Table, Segment } from "semantic-ui-react";
import "./history.scss";
import axios from "axios";

function History() {
  const [data, setData] =useState([])
  const [loading, setLoading] = useState(false)

  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("customerName");

  useEffect(() => {
    fetchAPI();
  },[])
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/history/${userId}`)
      .then(function (response) {
        // handle success
        const data = response.data.products;
        console.log("Histories: ", data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
 
  return (
    <div>
      <Navbar />
      <Segment loading={loading} className="history-container">
        <h4>
          Lịch sử mua hàng của <span>{currentUser}</span>
        </h4>
        <div className="history-content">
          <Table color="green" key="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
                <Table.HeaderCell>Số lượng</Table.HeaderCell>
                <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                <Table.HeaderCell>Địa chỉ giao hàng</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item) => (
                <Table.Row >
                  <Table.Cell>
                    <span className="history-name">{ item.productName }</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span style={{ color: "#db2828" }}>{item.quantity }</span>
                  </Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
                </Table.Row>
               ))} 
            </Table.Body>
          </Table>
        </div>
      </Segment>
      <Footer />
    </div>
  );
}
export default History;