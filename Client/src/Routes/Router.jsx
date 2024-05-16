import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductDetails } from "../Pages/ProductDetails";
import { Shop } from "../Pages/Shop";
import { Cart } from "../Pages/Cart";
import { CheckOut } from "../Pages/CheckOut";
import { Login } from "../Pages/Login";
import { Singup } from "../Pages/Singup";
import { Protected } from "../Component/Protected";
import {NewProduct} from "../Component/NewProduct";
import NewPruductPage from "../Pages/NewPruductPage";

export const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    sessionStorage.getItem("token") || false
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/men" element={<Home />} />
          <Route path="/wemen" element={<Home />} />
        <Route path="/Electronics" element={<Home />} />
        <Route path="/cosmatics" element={<Home />} />
          <Route path="/New" element={<NewPruductPage/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={
            <Protected isSignedIn={isSignedIn}><Cart />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/checkout" element={
        <Protected isSignedIn={isSignedIn}>
        <CheckOut />
      </Protected>
        } />
      </Routes>
    </>
  );
};
