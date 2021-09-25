import "./home.scss";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";
import product from "../../assets/data/product";
import { Icon, Input,Segment } from "semantic-ui-react";
const axios = require("axios");

function Home() {
  const [data, SetData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    // await SetData(product);
    //Start call AIP
    setLoading(true)
    await axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.products);
        SetData(response.data.products);
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false)
      });
  };
  // end call API

  // fetch('https://lap-center.herokuapp.com/api/product')
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //     setData(data.products)
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });

  useEffect(async () => {
    let url = `https://lap-center.herokuapp.com/api/product`;
    await fetchData(url);
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const onSubmitSearch = async () => {
    // setLoading(true)
    // await axios.get(`https://lap-center.herokuapp.com/api/product?productName=${search}`)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data.products);
    //     SetData(response.data.products);
    //     setLoading(false)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //     setLoading(false)
    //   });
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}`
    await fetchData(url);
  };

  const onSearchBrand = async (e) => {
    setBrand(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${e.target.value}&orderByColumn=price&orderByDirection=${price}`
    await fetchData(url);
  };

  const sortPrice = async (e) => {
    setPrice(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${e.target.value}`
    await fetchData(url);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="menuLeft">
        <Input
          icon={<Icon name="search" inverted circular link onClick={onSubmitSearch} />}
          
          placeholder="Search..."
          value={search}
          onChange={onChangeSearch}
        />
        <div className="selectForm">
          <p>Hãng</p>
          <select className="selectBox" value={brand} onChange={onSearchBrand}>
            <option selected value=""></option>
            <option value="Asus">ASUS</option>
            <option value="Dell">DELL</option>
            <option value="Acer">ACER</option>
            <option value="Lenovo">LENOVO</option>
          </select>
        </div>
        <div className="selectForm">
          <p>Giá</p>
          <select className="selectBox" value={price} onChange={sortPrice}>
            <option selected value=""></option>
            <option value="asc">Từ thấp đến cao</option>
            <option value="desc">Từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <Segment loading={loading} className="product">
        {data.map((item) => (
          <Card product={item} />
        ))}
      </Segment>
      <div className="menuRight"></div>
    </div>
  );
}

export default Home;
