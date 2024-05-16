import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import * as Scroll from 'react-scroll';

// Or Access Link,Element,etc as follows
let Link = Scroll.Link;



export const Header = () => {


  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));

  const navigate = useNavigate();
  const handalRedirect = () => {
    if (islogin) {
      navigate(`/cart`);

    } else {
      navigate(`/login`);

    }
  };

  const handalLogout = () => {
    sessionStorage.removeItem("token");
    setislogin(false)
    navigate(`/`);
  };



  return (


      <div>
        <div className="header">
          <div className="container">
            <li><Link to=""> <a className="site-logo" href="shop-index.html"><img
                src="assets/corporate/img/logos/logo-shop-red.png" alt="Metronic Shop UI"/></a></Link></li>

            <a href="javascript:void(0);" className="mobi-toggler"><i className="fa fa-bars"></i></a>

            {/* <!-- BEGIN CART --> */}





            {/* <!--END CART --> */}

            {/* <!-- BEGIN NAVIGATION --> */}
            <div className="header-navigation">
              <ul>
                <li>
                  <a href="/" className="navbar-link">
                    Home</a>
                </li>
                <li className="dropdown dropdown-megamenu">
                  <a className="navbar-link" data-target="#" href="/men">
                    <h>Men</h>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="header-navigation-content">
                        <div className="row">
                          <div className="col-md-4 header-navigation-col">
                            <h4></h4>
                            <ul>
                              <li><a href="/men">Pants</a></li>
                              <li><a href="/men">Sport</a></li>
                              <li><a href="/men">Shoes</a></li>
                              <li><a href="/men">T-shirts</a></li>
                              <li><a href="/men">Jacket</a></li>
                              <li><a href="/men">Watches</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="dropdown dropdown-megamenu">
                  <a className="navbar-link" data-target="#" href="/wemen">
                    Women
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="header-navigation-content">
                        <div className="row">
                          <div className="col-md-4 header-navigation-col">
                            <h4></h4>
                            <ul>
                              <li><a href="/wemen">Pants</a></li>
                              <li><a href="/wemen">Sport</a></li>
                              <li><a href="/wemen">Shoes</a></li>
                              <li><a href="/wemen">T-shirts</a></li>
                              <li><a href="/wemen">Jacket</a></li>
                              <li><a href="/wemen">Watches</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="dropdown dropdown-megamenu">
                  <a className="navbar-link" data-target="#" href="/Electronics">
                    Electronics
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="header-navigation-content">
                        <div className="row">
                          <div className="col-md-4 header-navigation-col">
                            <h4></h4>
                            <ul>
                              <li><a href="/Electronics">PC</a></li>
                              <li><a href="/Electronics">Laptop</a></li>
                              <li><a href="/Electronics">Mobile</a></li>
                              <li><a href="/Electronics">Tablet</a></li>
                              <li><a href="/Electronics">Hard disks</a></li>
                              <li><a href="/Electronics">Television</a></li>
                              <li><a href="/Electronics">Headphones</a></li>
                              <li><a href="/Electronics">Cameras</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="dropdown dropdown-megamenu">
                  <a className="navbar-link" data-target="#" href="/cosmatics">
                    Cosmatics
                  </a>

                  <ul className="dropdown-menu">
                    <li><a href="/cosmatics">Makeup</a></li>
                    <li><a href="/cosmatics">Self care</a></li>
                    <li><a href="/cosmatics">Hair care</a></li>
                    <li><a href="/cosmatics">Skin care</a></li>
                    <li><a href="/cosmatics">Perfume</a></li>
                  </ul>
                </li>
                <li className="dropdown-megamenu">
                  <a className="navbar-link" data-target="#" href="/New">
                    Add New Product
                  </a>
                </li>


                  {/* <!-- BEGIN TOP SEARCH --> */}
                  {/*<li className="menu-search">*/}
                  {/*  <span className="sep"></span>*/}
                  {/*  <i className="fa fa-search search-btn"></i>*/}
                  {/*  <div className="search-box">*/}
                  {/*    <form action="#">*/}
                  {/*      <div className="input-group">*/}
                  {/*        <input type="text" placeholder="Search" className="form-control"/>*/}
                  {/*        <span className="input-group-btn">*/}
                  {/*      <button className="btn btn-primary" type="submit">Search</button>*/}
                  {/*    </span>*/}
                  {/*      </div>*/}
                  {/*    </form>*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                  <div className="header-action">
                    <div className="search-wrapper" data-search-wrapper="">
                      <button
                          className=""
                          aria-label="Toggle search"
                          data-search-btn=""
                      >
                        {/*<ion-icon name="search-outline" className="search-icon"/>*/}
                        {/*<ion-icon name="close-outline" className="close-icon" />*/}
                      </button>
                      <div classname="basket-outline">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search here"
                            className="search-input"
                        />
                        <button className="search-submit" aria-label="Submit search">
                          <ion-icon name="search-outline"/>
                        </button>
                      </div>
                    </div>
                    {/*//whishlist */}
                    {/*/!* {islogin ?}
              <button
                className="header-action-btn"
                aria-label="Open whishlist"
                data-panel-btn="whishlist"
              >
                <ion-icon name="heart-outline" />
                <data className="btn-badge" value={3}>
                  03
                </data>
              </button>
            ) : (
              <></>
            )} */}
                    {!islogin ? (
                        <button
                            className=""
                            aria-label="Open shopping cart"
                            data-panel-btn="cart"
                            onClick={handalRedirect}
                        >
                          <ion-icon name="person"></ion-icon>
                        </button>
                    ) : (
                        <>
                          <button
                              className="header-action-btn"
                              aria-label="Open shopping cart"
                              data-panel-btn="cart"
                              onClick={handalRedirect}
                          >
                            <ion-icon name="basket-outline"/>
                            <data className="btn-badge" value={2}>
                              0
                            </data>
                          </button>
                        </>

                    )}
                    {islogin ? <button
                        className="header-action-btn"
                        aria-label="Open shopping cart"
                        data-panel-btn="cart"
                        onClick={() => handalLogout()}
                    >
                      <ion-icon name="log-out-outline"></ion-icon>
                    </button> : <></>}
                  </div>
                  {/* <!-- END TOP SEARCH --> */}
              </ul>
            </div>
            {/* <!-- END NAVIGATION --> */}
          </div>
        </div>

      </div>
);
};
