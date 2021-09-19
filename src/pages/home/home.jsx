import "./home.scss";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/card/card";
import product from "../../assets/data/product";
import { Icon, Input } from "semantic-ui-react";
const axios = require('axios');

function Home() {
  const [data, SetData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const fetchData = async () => {
    // await SetData(product);

    //Start call AIP
    axios.get('https://lap-center.herokuapp.com/api/product')
  .then(function (response) {
    // handle success
    console.log(response.data.products);
    SetData(response.data.products);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
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
    await fetchData();
  }, []);

  const onChangeSearch =(e) =>{
    setSearch(e.target.value)
    console.log(e.target.value);
  }

  const onSubmitSearch = () => {
    SetData(
      product.filter((item) =>
        item?.name?.toLowerCase()?.includes(search.toLowerCase())
      )
    );
  };

  const onSearchBrand = async (e) => {
    await setBrand(e.target.value);
    await SetData (
      product.filter((item)=>
      item?.brand?.toLocaleLowerCase()?.includes(e.target.value.toLowerCase())
      )
    );
  }; 

  const sortPrice = (e) => {
    setPrice(e.target.value ) 
      if(e.target.value == 1){
      SetData (
        product.sort((a,b) => parseFloat(a.price) - parseFloat(b.price))
      )
    } else {
      SetData(
        product.sort((a,b) => parseFloat(b.price) - parseFloat(a.price))
      )
    }
  }

  

  return (
    <div className="home-container">
      <Navbar />
      <div className="menuLeft">
        <Input
          icon={<Icon name="search" inverted circular link />} onClick={onSubmitSearch}
          placeholder="Search..." value={search} onChange={onChangeSearch}
        />
        <div className="selectForm">
          <p>Hãng</p>
          <select className="selectBox" value={brand} onChange={onSearchBrand} > 
            <option selected value=""></option>
            <option value="Asus">ASUS</option>
            <option value="Dell">DELL</option>
            <option value="Acer">ACER</option>
            <option value="Lenovo">LENOVO</option>
          </select>
        </div>
        <div className="selectForm" >
          <p>Giá</p>
          <select className="selectBox" value={price} onChange={sortPrice} >
            <option selected value=""></option>
            <option value="1">Từ thấp đến cao</option>
            <option value="2">Từ cao đến thấp</option>
          </select>
        </div>
        
      </div>
      <div className="product">
        {data.map((item) => (
          <Card product={item} />
        ))}
      </div>
      <div className="menuRight">

      </div>
    </div>
  );
}

export default Home;
