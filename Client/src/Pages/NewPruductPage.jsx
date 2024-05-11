import React from 'react'
import {Header} from "../Component/Header";
import {NewProduct} from "../Component/NewProduct";
import {Footer} from "../Component/Footer";

export default function NewPruductPage() {
    return (
        <div>
            <Header/>

            <div className="main">
                <div className="container">

                    <NewProduct/>
                </div>
            </div>
            <Footer/>
        </div>

    )
}