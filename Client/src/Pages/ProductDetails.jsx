import React, {useEffect, useState} from 'react'
import {Header} from '../Component/Header'
import {Footer} from '../Component/Footer'
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Rate} from "./Rate";

export const ProductDetails = () => {
    // ProductDetails = Rating
    const [ProductDetails, setProductDetails] = useState(0);
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    const {id} = useParams();

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }
    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const handlePlus = () => {
        if (quantity > 0) {
            setQuantity(quantity + 1);
        }
    }
    const onToast = () => {
        toast.success('Added to cart!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const handleCart = async () => {
        console.log(quantity);
        const res = await fetch(
            `http://localhost:9090/cart/addproduct`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({

                    productId: id,
                    quantity: quantity,
                }),
            }
        );
        if (res.status === 200) {
            onToast();
        }


    };
    const handleReview = async () => {
        console.log(ProductDetails+" "+id);
        const res = await fetch(
            `http://localhost:9090/review`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({

                    productId: id,
                    rate: ProductDetails,
                }),
            }
        );
        if (res.status === 200) {
            onToast();
        }


    };
    useEffect(() => {
        window.scrollTo(0, 0)

        const fatchData = async () => {
            const response = await fetch(`http://localhost:9090/product/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            });

            const res = await response.json();
            setData(res);
        }
        fatchData();
    }, []);


    return (
        <>

            <>
                <Header/>
                <div className="pd-wrap">
                    <div className="container">
                        {/* <div className="heading-section">
        <h2>Product Details</h2>
      </div> */}
                        {console.log(data.img)}
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center">
                                {!data.img ? <></> : <img className='productimg' width="167"
                                                          height="250" src={`data:image/png;base64,${data.img}`}
                                                          alt="Product Image"/>}
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{data.productName}</div>

                                        <div className="row">
                                            <div className="col tex-center">
                                                <h2>Rate me</h2>
                                                <p>Rating component</p>
                                                <Rate ProductDetails={ProductDetails}
                                                      onRating={(Rate) => setProductDetails(Rate)} count={5}></Rate>
                                                <p>Rating: {ProductDetails}</p>
                                                <button className="button btn-primary"
                                                        onClick={() => handleReview()}
                                                >Send your rate</button>
                                            </div>
                                        </div>

                                        <div className="product-price-discount">
                                            <span>Rs {data.price}</span>
                                            <span className="line-through">Rs {data.price + 100}</span>
                                        </div>
                                    </div>
                                    <p>
                                        {data.productDescription}
                                    </p>
                                    <div className="row">
                                        {/* <div className="col-md-6">
                <label htmlFor="size">Size</label>
                <select id="size" name="size" className="form-control">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div> */}
                                        {/* <div className="col-md-6">
                <label htmlFor="color">Color</label>
                <select id="color" name="color" className="form-control">
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Red</option>
                </select>
              </div> */}
                                    </div>
                                    <div className="product-count">
                                        <label htmlFor="size">Quantity</label>
                                        <form action="#" className="display-flex">
                                            <div className="qtyminus" onClick={() => handleMinus()}>-</div>
                                            <input
                                                type="text"
                                                name="quantity"
                                                onChange={(e) => handleQuantity(e)}
                                                defaultValue={1}
                                                value={quantity}
                                                className="qty"
                                            />
                                            <div className="qtyplus" onClick={() => handlePlus()}>+</div>
                                        </form>
                                        <a className="round-black-btn" onClick={(quantity) => handleCart(quantity)}>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer/>
            </>


        </>
    )
}
