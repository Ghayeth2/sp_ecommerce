import React from 'react';
import {Header} from "../Component/Header";
import {ProductDetails} from "./ProductDetails";
import {Footer} from "../Component/Footer";
import {Route, Routes} from "react-router-dom";

export default function ProductDetailsPage() {
    return (
        <div>
            <div className="main">
                <div className="container">
                    <Header/>
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <Routes>
                        <Route path={"/product/:id"} element={<ProductDetails/>}></Route>
                    </Routes>
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}