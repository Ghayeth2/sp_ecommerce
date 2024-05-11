import React, {useEffect, useState} from 'react'
import {Header} from '../Component/Header'
import {Footer} from '../Component/Footer'
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Rate} from "./Rate";
import {ProductCard} from "../Component/ShopComponent/ProductCard";
import axiosFetch from "../Helper/Axios";
import './productDetiles.css'


export const ProductDetails = () => {
    // ProductDetails = Rating
    const [ProductDetails, setProductDetails] = useState(0);
    const [data, setData] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

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

    const fatchData = async () => {
        const response = await fetch(`http://localhost:9090/product/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            },
        });

        const res = await response.json();
        setData(res)
    }

    const fetchRecommendations = async () => {
        if (!data || !data.description) {
            // Exit early if data or description is not available yet
            return;
        }

        const url = `recommendations/generate?desc=${data.description}`;
        console.log("Description sent to backend: " + data.description);

        try {
            const response = await axiosFetch({
                url: url,
                method: 'GET',
            });

            console.log("Recommendations : " + response.data);
            setRecommendations(response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    useEffect(() => {
        fatchData();
    }, []);

    useEffect(() => {
        fetchRecommendations();
    }, [data]); // Trigger fetchRecommendations whenever data changes


    return (
        <>
            <Header/>
            <>
                <div className="pd-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                {!data.img ? <></> : <img className='img_box-inner' width="350" height="350" src={data.img}
                                                          alt="Product Image"/>}
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <h2 className="product-name">{data.productName}</h2>
                                        <div className="row align-items-center">
                                            <div className="col text-center">
                                                <h3>Rate Me</h3>
                                                <p>Rating component</p>
                                                <Rate ProductDetails={ProductDetails}
                                                      onRating={(Rate) => setProductDetails(Rate)} count={5}></Rate>
                                                <p>Rating: {ProductDetails}</p>
                                                <button className="btn btn-primary" onClick={handleReview}>Send your
                                                    rate
                                                </button>
                                            </div>
                                        </div>
                                        <div className="product-price-discount">
                                            <p>Price: Rs {data.price}</p>
                                            <p className="line-through">Discounted Price: Rs {data.price + 100}</p>
                                        </div>
                                    </div>
                                    <p>{data.description}</p>
                                    <div className="product-count">
                                        <label htmlFor="quantity">Quantity</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-outline-secondary" type="button"
                                                        onClick={handleMinus}>-
                                                </button>
                                            </div>
                                            <input type="text" name="quantity" onChange={handleQuantity}
                                                   value={quantity} className="form-control qty"/>
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button"
                                                        onClick={handlePlus}>+
                                                </button>
                                            </div>
                                        </div>
                                        <button className="btn btn-dark mt-3" onClick={handleCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*recommendProduct*/}
                <div className="container-fluid py-5">
                    <div className="text-center mb-4">
                        <h2 className="section-title"><span className="px-2">Recommend Products</span></h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="recommendation-container">
                            {recommendations.map((item) => (
                                <div className="col-md-2 mb-2" key={item.productId}>
                                    <ProductCard
                                        id={item.productId}
                                        name={item.productName}
                                        description={item.description}
                                        price={item.price}
                                        img={item.img}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/*recommendProduct*/}



                <Footer/>
            </>


        </>
    )
}
