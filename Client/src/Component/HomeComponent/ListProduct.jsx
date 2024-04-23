import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";

export const ListProduct = () => {
  const[token,setToken]=useState(sessionStorage.getItem("token"));
  
  const[data,setData]=useState([]);
  const fatchData = async () => {
    const page = 0; // Specify the page number you want
    const size = 15; // Specify the page size
    const url = `product?page=${page}&size=${size}`;

    const response = await axiosFetch({
      url: url,
      method: 'GET',
    });
    
    // const
    console.log(response.data);
    setData(response.data);
  };


  
  useEffect(() => {
    fatchData();
  }, []);

  
  return (
    <>
      <section id="products" className="section product">
        <div className="container">

          <h2 className="h2 section-title">Categories</h2>
          <ul className="filter-list">
            <li>
              <button className="filter-btn active">


                <p className="filter-text">Men</p>
              </button>
            </li>
            <li>
              <button className="filter-btn">


                <p className="filter-text">Women</p>
              </button>
            </li>
            <li>
              <button className="filter-btn">


                <p className="filter-text">Electronics</p>
              </button>
            </li>
            <li>
              <button className="filter-btn">

                <p className="filter-text">Cosmatics</p>
              </button>
            </li>
          </ul>
          <p className="section-subtitle"> New products </p>
          <ul className="grid-list">
            {data.map((item) => 

               <ProductCard  key={item.productId} id={item.productId} name={item.productName} description={item.description} price={item.price} img={item.img} />
            
            
        
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
