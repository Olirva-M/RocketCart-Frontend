import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import '../css/Home2.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Assuming you have a Loader component

const Home = ({ setCartItemCount, setShowPopup, setPopupMsg, role, setRole, logged, setLogged, id, setId }) => {
    const min = "10";
    const max = "100000";
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage] = useState(2);
    const [pageSize] = useState(20);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [priceFilter, setPriceFilter] = useState({
        min: 10,
        max: 100000
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(-1);

    const handleCategoryFilterChange = async (event) => {
        await setSelectedCategory(event.target.value);
        console.log(selectedCategory);
        setRefresh(true);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setRefresh(true);
    };

    const handlePriceFilterChange = async (event) => {
        const { name, value } = event.target;
        await setPriceFilter({
            ...priceFilter,
            [name]: value
        });
        setRefresh(true);
        console.log(priceFilter);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let response;
            if (role == 2) {
                response = await axiosInstance.get(`http://localhost:8080/api/sellers/${id}/products?page=${currentPage}&size=${pageSize}&minPrice=${priceFilter.min}&maxPrice=${priceFilter.max}&sort=${selectedOrder}&searchKeyword=${searchQuery}`);
                console.log("seller's products fetched", response.data.content);
            } else {
                if (!selectedCategory) {
                    response = await axiosInstance.get(`http://localhost:8080/api/products?page=${currentPage}&size=${pageSize}&minPrice=${priceFilter.min}&maxPrice=${priceFilter.max}&sort=${selectedOrder}&searchKeyword=${searchQuery}`);
                    console.log("all products fetched", response.data.content, id, role, logged);
                } else {
                    response = await axiosInstance.get(`http://localhost:8080/api/products?page=${currentPage}&size=${pageSize}&categoryName=${selectedCategory}&minPrice=${priceFilter.min}&maxPrice=${priceFilter.max}&sort=${selectedOrder}&searchKeyword=${searchQuery}`);
                    console.log("category fetched", response);
                }
            }
            setProducts(response.data.content);
            setTotalProducts(response.data.totalElements);
            setTotalPages(response.data.totalPages - 1);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching products:', error);

                    setLoading(false);
                    setPopupMsg("No products found");
                    setShowPopup(true);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("role") == 3){
            navigate('/profile');
            return;
        }
        if (refresh) {
            fetchProducts();
            setRefresh(false);
        }
    }, [refresh, searchQuery, currentPage, selectedCategory]);

    const handleAddToCart = async (pid, q) => {
        console.log('handleAddToCart');
        if (!logged) {
            navigate(`/cart`);
        } else {
            try {
                const prod_object = await axiosInstance.get(`http://localhost:8080/api/products/${pid}`);
                await axiosInstance.post(`http://localhost:8080/api/customers/${id}/cart`, { "product": prod_object.data, "quantity": q });
                setShowPopup(true);
                setPopupMsg("Product added to cart");
                const cart = await axiosInstance.get(`http://localhost:8080/api/customers/${id}/cart`);
                setCartItemCount(cart.data.length);
            } catch (error) {
                console.error('error:', error);
            }
        }
    };

    const handleProductClick = (pid) => {
        console.log('handleProductClick', pid);
        navigate(`/product/${pid}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 0) {
            setShowPopup(true);
            setPopupMsg("This is the first page!");
        } else if (newPage > totalPages) {
            setShowPopup(true);
            setPopupMsg("This is the last page!");
        } else {
            window.scrollTo(0, 0);
            setCurrentPage(newPage);
            setRefresh(true);
        }
    };

    const handleSort = async (event) => {
        await setSelectedOrder(event.target.value);
        console.log(selectedOrder);
        setRefresh(true);
    };

    return (
        <div className="product-list-container">
            <div className="background-glow"></div>
            {(role != 2) && (
                <div className="filters">
                    <h2>Filters</h2>
                    <div className="filter-section">
                        <br />
                        <h3>Price Range</h3>
                        <label htmlFor="min">Min Value: {priceFilter.min}</label>
                        <input
                            type="number"
                            id="min"
                            name="min"
                            min={min}
                            max={max}
                            step={90}
                            value={priceFilter.min}
                            onChange={handlePriceFilterChange}
                        />

                        <label htmlFor="max">Max Value: {priceFilter.max}</label>
                        <input
                            type="number"
                            id="max"
                            name="max"
                            min={min}
                            max={max}
                            step={90}
                            value={priceFilter.max}
                            onChange={handlePriceFilterChange}
                        />
                    </div>
                    <div className="filter-section">
                        <h3>Category</h3>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value=""
                                onChange={handleCategoryFilterChange}
                            />
                            None
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Clothing"
                                onChange={handleCategoryFilterChange}
                            />
                            Clothing
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Sports"
                                onChange={handleCategoryFilterChange}
                            />
                            Sports
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Footwear"
                                onChange={handleCategoryFilterChange}
                            />
                            Footwear
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Furniture"
                                onChange={handleCategoryFilterChange}
                            />
                            Furniture
                        </label>
                        <br />
                        <h3>Sort by price</h3>
                        <select value={selectedOrder} onChange={handleSort}>
                            <option value="-1">default</option>
                            <option value="1">High to Low</option>
                            <option value="0">Low to High</option>
                        </select>
                    </div>
                </div>
            )}
            <div className="products-list">
                <input
                    type="text"
                    placeholder="Search here"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                {loading ? (
                    <Loader /> 
                ) : (
                    <>
                        {products && (
                            <ul className="product-list">
                                {products.map((product) => (
                                    <li key={product.productId} className="product-item">
                                        <div className="product-item-content">
                                            <div
                                                className="product-image"
                                                onClick={() => handleProductClick(product.productId)}
                                            >
                                                <img src={product.imageUrl} alt={product.name} />
                                            </div>
                                            <div className="product-details">
                                                <h3
                                                    className="product-name"
                                                    onClick={() => handleProductClick(product.productId)}
                                                >
                                                    {product.productName}
                                                </h3>
                                                <p className="product-price">Price: ${product.price}</p>
                                                {(role != 2) && (
                                                    <button
                                                        onClick={() => handleAddToCart(product.productId, 1)}
                                                        disabled={product.stock === 0 || product.disabled}
                                                        style={{ backgroundColor: (product.stock === 0 || product.disabled) ? "grey" : "#f8b400" }}
                                                        className="add-to-cart-button"
                                                    >
                                                        {(product.stock === 0 || product.disabled) ? "Currently unavailable" : "Add to Cart"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {totalProducts ? (
                            <div className="pagination">
                                <button
                                    style={{ color: 'black', textDecoration: 'underline' }}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {currentPage + 1} of {totalPages + 1}
                                </span>
                                <button
                                    style={{ color: 'black', textDecoration: 'underline' }}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        ) : (
                            <p>No products found!</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
