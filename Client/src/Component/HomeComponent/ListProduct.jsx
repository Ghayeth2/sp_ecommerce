import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";
import './ListProduct.css'

export const ListProduct = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page number
    const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

    const fetchData = async (page) => {
        const size = 300; // Specify the page size
        const url = `product?page=${page}&size=${size}`;

        const response = await axiosFetch({
            url: url,
            method: 'GET',
        });

        setData(response.data);
        setTotalPages(response.totalPages);
    };

    useEffect(() => {
        fetchData(currentPage); // Fetch data for the current page when component mounts or currentPage changes
    }, [currentPage]);

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1); // Decrease current page number
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1); // Increase current page number
    };

    const goToPage = (page) => {
        setCurrentPage(page - 1); // Set current page to the selected page
    };

    return (
        <>
            <section id="products" className="section product">
                <div className="container">

                        <h2 className="h2">Categories</h2>
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

                            {/* Filter buttons go here */}
                        </ul>
                        <p className="section-subtitle"> New products </p>
                        <ul className="grid-list">
                            {data.map((item) => (
                                <ProductCard
                                    key={item.productId}
                                    id={item.productId}
                                    name={item.productName}
                                    description={item.description}
                                    price={item.price}
                                    img={item.img}
                                />
                            ))}
                        </ul>
                        <div className="pagination">
                            <button onClick={goToPreviousPage} disabled={currentPage === 0}
                                    className="prev-next-button">Previous
                            </button>
                            {/* Show page numbers */}
                            {[...Array(totalPages).keys()].map(page => (
                                <button key={page} onClick={() => goToPage(page + 1)}
                                        className={currentPage === page ? 'page-button active' : 'page-button'}>{page + 1}</button>
                            ))}
                            <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}
                                    className="prev-next-button">Next
                            </button>
                        </div>
                    </div>
         
            </section>
        </>
);
};
