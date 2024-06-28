import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axiosInstance from './axiosInstance';
import axios from 'axios';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';
import ProductStat from './ProductStat';

const Product = ({ setCartItemCount, setShowPopup, setPopupMsg, role, setRole, logged, setLogged, id, setId }) => {
    const [product, setProduct] = useState(null);
    const [avg_rating, setAvgRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [canreview, setCanreview] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [sold, setSold] = useState('');
    const [notsold, setNotsold] = useState('');
    const { pid } = useParams();
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${pid}`);
            setProduct(response.data);
            const r = await axios.get(`http://localhost:8080/api/products/${pid}/average-rating`);
            setAvgRating(r.data);
            const reviewsResponse = await axios.get(`http://localhost:8080/api/products/${pid}/reviews`);
            setReviews(reviewsResponse.data);
            const alreadyreviewed = await axiosInstance.get(`http://localhost:8080/api/customers/${id}/products/${pid}/reviews/check`);
            const purchased = await axiosInstance.get(`http://localhost:8080/api/customers/${id}/products/${pid}/check-purchased`);
            // console.log("alreadyreviewed", alreadyreviewed.data, purchased.data)
            if (!alreadyreviewed.data && purchased.data){
                setCanreview(true);
            }

            var stats;
            if (localStorage.getItem("role") == 2){
                stats = await axiosInstance.get(`http://localhost:8080/api/sellers/${id}/products/${pid}/sold-statistics`);
                console.log("stats", stats);
                setSold(stats.data[0]);
                setNotsold(stats.data[1]);}
        } catch (error) {
          console.error('Error fetching the product:', error);
        }
    };

    const decQuantity = async(product) => {
        const response = await axiosInstance.put(`http://localhost:8080/api/sellers/${id}/products/${product.productId}`, {
          "productId": product.productId,
          "productName": product.productName,
          "description": product.description,
          "price": product.price,
          "stock": product.stock - 1,
          "categoryName": product.categoryName,
          "imageUrl": product.imageUrl
        });
        setShowPopup(true);
        setPopupMsg("Stock decreased!");
        fetchProduct();
    };

    const incQuantity = async(product) => {
        const response = await axiosInstance.put(`http://localhost:8080/api/sellers/${id}/products/${product.productId}`, {
          "productId": product.productId,
          "productName": product.productName,
          "description": product.description,
          "price": product.price,
          "stock": product.stock + 1,
          "categoryName": product.categoryName,
          "imageUrl": product.imageUrl
        });
        setShowPopup(true);
        setPopupMsg("Stock increased!");
        fetchProduct();
    };

    const [productEnabled, setProductEnabled] = useState(false);

    useEffect(() => {
        fetchProduct();
        
    }, [pid]);

    const toggle = async() => {
        await axiosInstance.post(`http://localhost:8080/api/sellers/${id}/products/${product.productId}/toggle-disable`);
        setProductEnabled(!productEnabled);
        fetchProduct();
    };

    const handleAddToCart = async (pid, q) => {
        if (!logged) {
            navigate(`/cart`);
        } else {
            try {
                const prod_object = await axiosInstance.get(`http://localhost:8080/api/products/${pid}`);
                await axiosInstance.post(`http://localhost:8080/api/customers/${id}/cart`, { "product": prod_object.data, "quantity": q });
                setShowPopup(true);
                const cart = await axiosInstance.get(`http://localhost:8080/api/customers/${id}/cart`);
                setCartItemCount(cart.data.length);
                setPopupMsg("Product added to cart");
            } catch (error) {
                console.error('error:', error);
            }
        }
    };

    const handleReviewSubmit = async (e) => {
        

        e.preventDefault();
        try {
            setPopupMsg("Thank you for your review!");
            
            console.log('review: ', newReview);
            await axiosInstance.post(`http://localhost:8080/api/customers/${id}/products/${pid}/reviews`, newReview);
            setCanreview(false);
            setShowPopup(true);
            fetchProduct();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!product) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <>
            <button
                onClick={() => navigate('/')}
                style={{marginLeft:"40px", width: "50px", border:"1px solid black", color:"black"}}>
                Back
            </button>
            <div style={styles.container}>
                <div style={styles.imageContainer}>
                    <img style={styles.productImage} src={product.imageUrl} alt={product.productName} />
                </div>
                <div style={styles.detailsContainer}>
                    <h1 style={styles.productTitle}>{product.productName}</h1>
                    <p style={styles.price}>${product.price}</p>
                    <p>Rating: {avg_rating.toFixed(2)}</p>

                    {role == 1 && (
                        <button
                            onClick={() => handleAddToCart(product.productId, 1)}
                            disabled={product.stock === 0 || product.disabled}
                            style={{backgroundColor: (product.stock === 0 || product.disabled) ? "grey" : "#f8b400"}}
                            className="add-to-cart-button">
                            {(product.stock === 0 || product.disabled) ? "Currently unavailable" : "Add to Cart" }
                        </button>
                    )}
                    {role == 2 ? (
                        <div>
                            <button onClick={() => decQuantity(product)} style={{ backgroundColor: "#6da0ff" }}>-</button>
                            &nbsp;&nbsp;
                            {product.stock}
                            &nbsp;&nbsp;
                            <button onClick={() => incQuantity(product)} style={{ backgroundColor: "#6da0ff" }}>+</button>
                            <br /><br />
                            <button 
                                onClick={toggle} 
                                style={{ color: product.disabled ? "green" : "red",
                                    borderColor: product.disabled ? "darkgreen" : "darkred",
                                    borderWidth: "2px",
                                    borderStyle: "solid" }}>
                                {product.disabled ? "Enable Product" : "Disable Product"}
                            </button>
                        </div>
                    ) : (
                        <p style={styles.stock}>{product.stock} available</p>
                    )}
                    <p style={styles.description}>{product.description}</p>
                </div>
            </div>

            {localStorage.getItem("role")>0 && (canreview) &&(<form onSubmit={handleReviewSubmit} style={styles.reviewForm}>
                    <h3>Write a Review</h3>
                    <StarRating hover={true} rating={newReview.rating} setRating={(rating) => setNewReview({ ...newReview, rating })} />
                    <textarea 
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        style={styles.textarea}
                        placeholder="Write your review here"
                        required
                    />
                    <button type="submit" style={styles.submitButton}>Submit</button>
            </form>)}
            {(localStorage.getItem("role")==2) && (<p style={styles.price}>Revenue Generated: ${(product.price * sold).toFixed(2)}</p>)}

            {(localStorage.getItem("role")==2) && <ProductStat sold={sold} notsold={notsold} />}

            <div style={styles.reviewsContainer}>
                <h2>Customer Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to review this product!</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} style={styles.review}>
                            {review.customer ? (<p>{review.customer.username}</p>) : "Username unavailable"}
                            <StarRating hover={false} rating={review.rating} />
                            <p>{review.comment}</p>
                        </div>
                    ))
                )}
                
            </div>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    imageContainer: {
        flex: '1',
        textAlign: 'center',
        padding: '20px',
    },
    productImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    detailsContainer: {
        flex: '2',
        padding: '20px',
    },
    productTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    price: {
        color: '#007BFF',
        fontSize: '24px',
        margin: '10px 0',
    },
    stock: {
        color: 'red',
        fontSize: '15px',
        margin: '10px 0',
    },
    description: {
        fontSize: '18px',
        lineHeight: '1.5',
        margin: '20px 0',
    },
    loading: {
        textAlign: 'center',
        fontSize: '24px',
        padding: '50px',
    },
    reviewsContainer: {
        margin: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    review: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    reviewForm: {
        marginTop: '20px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Product;
