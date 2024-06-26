import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import StarRating from './StarRating';

const Product = ({ logged, setLogged, id, setId }) => {
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const { pid } = useParams();

    const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/${pid}`);
          console.log(response);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching the product:', error);
        }
      };
    useEffect(() => {
        fetchProduct();
      }, [pid]);

      const decQuantity = async(product) => {
        // console.log(product);
        const response = await axios.put(`http://localhost:8080/api/sellers/${id}/products/${product.productId}`, { "productId":product.productId, "productName":product.productName, "description":product.description, "price":product.price, "stock":product.stock-1, "categoryName":product.categoryName, "imageUrl":product.imageUrl});
        fetchProduct();

    };

    // Function to increase quantity
    const incQuantity = async(product) => {
        const response = await axios.put(`http://localhost:8080/api/sellers/${id}/products/${product.productId}`, { "productId":product.productId, "productName":product.productName, "description":product.description, "price":product.price, "stock":product.stock+1, "categoryName":product.categoryName, "imageUrl":product.imageUrl});
        
        fetchProduct();
    };
    const [productEnabled, setProductEnabled] = useState(false);

    const toggle = async() => {
        // await endpoint
        setProductEnabled(!productEnabled);
    };

    if (!product) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <img style={styles.productImage} src={product.imageUrl} alt={product.productName} />
            </div>
            <div style={styles.detailsContainer}>
                <h1 style={styles.productTitle}>{product.productName}</h1>
                <StarRating rating={rating} setRating={setRating} />
                <p style={styles.price}>${product.price}</p>
                {(id === 1)? (<p style={styles.stock}>{product.stock} available</p>) :
                (<div >
                    <button onClick={() => decQuantity(product)} style={{ backgroundColor: "#6da0ff" }}>-</button>
                    &nbsp;&nbsp;
                    {product.stock}
                    &nbsp;&nbsp;
                    <button onClick={() => incQuantity(product)} style={{ backgroundColor: "#6da0ff" }}>+</button>
                    <br></br>
                    <br></br>
                    <button 
                        onClick={toggle} 
                        style={{ color: productEnabled ? "green" : "red",
                            borderColor: productEnabled ? "darkgreen" : "darkred",
                            borderWidth: "2px",
                            borderStyle: "solid" }}
                        >
                        {productEnabled ? "Enable Product" : "Disable Product"}
                    </button>
                </div>)}
                <p style={styles.description}>{product.description}</p>
            </div>
        </div>
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
    }
};

export default Product;
