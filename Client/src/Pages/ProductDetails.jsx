import React, {useEffect, useState} from 'react'
import {Header} from '../Component/Header'
import {Footer} from '../Component/Footer'
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Rate} from "./Rate";
import {ProductCard} from "../Component/ShopComponent/ProductCard";
import axiosFetch from "../Helper/Axios";

export const ProductDetails = () => {
    // ProductDetails = Rating
    const [ProductDetails, setProductDetails] = useState(0);
    const [data, setData] = useState([]);
    const[recommendations,setRecommendations]=useState([]);

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
        console.log(ProductDetails + " " + id);
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

    const fetchRecommendations = async () => {
        const url = `recommendations/generate?desc=${data.description}`;
        console.log("Description sent to backend: "+data.description)
        const response = await axiosFetch({
            url: url,
            method: 'GET',
        });

        // const
        console.log("Recommendations : "+response.data);
        setRecommendations(response.data);
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);


    return (
        <>

            <>
                <Header/>
                <div className="pd-wrap">
                    <div className="container">
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
                                                >Send your rate
                                                </button>
                                            </div>
                                        </div>

                                        <div className="product-price-discount">
                                            <span>Rs {data.price}</span>
                                            <span className="line-through">Rs {data.price + 100}</span>
                                        </div>
                                    </div>
                                    <p>
                                        {data.description}
                                    </p>
                                    <div className="row">
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
                {/*recommendProduct*/}
                <div className="container-fluid py-5">
                    <div className="text-center mb-">
                        <h2 className="section-title px-5"><span className="px-2">Recommend Products</span></h2>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="owl-carousel related-carousel d-flex justify-content-between">

                                {recommendations.map((item) =>

                                    <ProductCard  key={item.productId}
                                                  id={item.productId}
                                                  name={item.productName}
                                                  description={item.description}
                                                  price={item.price}
                                                  img={item.img}
                                    />



                                )}

                                {/*<div className="card product-item border-0">*/}
                                {/*    <div*/}
                                {/*        className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">*/}
                                {/*        <img className="img-fluid w-100" src="img/product-2.jpg" alt=""/>*/}
                                {/*    </div>*/}
                                {/*    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">*/}
                                {/*        <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>*/}
                                {/*        <div className="d-flex justify-content-center">*/}
                                {/*            <h6>$123.00</h6>*/}
                                {/*            <h6 className="text-muted ml-2">*/}
                                {/*                <del>$123.00</del>*/}
                                {/*            </h6>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="card-footer d-flex justify-content-between ">*/}
                                {/*        <a href="" className=" btn btn-sm p-2"><i*/}
                                {/*            className="fas fa-eye text-primary mr-1"></i>View Detail</a>*/}
                                {/*        <a href="" className="btn btn-sm p-2"><i*/}
                                {/*            className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                {/*recommendProduct*/}


                <Footer/>
            </>


        </>
    )
}
