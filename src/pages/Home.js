import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (event) => {
      setRefresh(true);
      setSearchQuery(event.target.value);
    };
  
    // const handleButtonClick = async () => {
    //   const newProduct = {
    //     name: name,
    //     category: category,
    //     price: price,
    //     quantity: quantity,
    //   };
  
    //   try {
    //     const response = await axios.post('http://localhost:8080/api/products', newProduct);
    //     setName('');
    //     setCategory('');
    //     setPrice('');
    //     setQuantity('');
    //   } catch (error) {
    //     console.error('Error adding product:', error);
    //   }
  
    //   setRefresh(true);
    // };
  
    // const handleNameChange = (event) => {
    //   setName(event.target.value);
    // };
  
    // const handleCategoryChange = (event) => {
    //   setCategory(event.target.value);
    // };
  
    // const handlePriceChange = (event) => {
    //   setPrice(event.target.value);
    // };
  
    // const handleQuantityChange = (event) => {
    //   setQuantity(event.target.value);
    // };
    useEffect(() => {
        // Background glow effect
        const handleMouseMove = (e) => {
            const glow = document.querySelector('.background-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgb(157, 253, 255) 0%, rgba(255,255,255,0) 30%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleMouseMoveProductItems = (e) => {
            const tiltElement = document.elementFromPoint(e.clientX, e.clientY);
            console.log('product tilt out')

            if (tiltElement && tiltElement.classList.contains('product-item')) {
                console.log('product tilt')
                const rect = tiltElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                const rotateX = (mouseY / centerY) * 10;
                const rotateY = -(mouseX / centerX) * 10;

                tiltElement.style.transform = `perspective(100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }

            const allTiltElements = document.querySelectorAll('.product-item');
            allTiltElements.forEach((element) => {
                if (element !== tiltElement) {
                    element.style.transform = '';
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMoveProductItems);

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveProductItems);

            // Reset transform for all elements when component unmounts
            const allTiltElements = document.querySelectorAll('.product-item');
            allTiltElements.forEach((element) => {
                element.style.transform = '';
            });
        };
    }, []);    

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products?query=${searchQuery}`);
            setProducts(response.data);
            // console.log('fetched', products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        if (refresh) {
            fetchProducts();
            setRefresh(false);
        }
    }, [refresh, searchQuery, setRefresh]);

    function handleAddToCart(){
      console.log("handleAddToCart");
    }

    function handleProductClick(){
      console.log("handleProductClick");
    }

    return (
        <div className="product-list-container">
            <div className="background-glow"></div>
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                marginRight: '10px',
                marginBottom: '30px',
                width: '380px',
                justifyContent: 'center',
                display: 'block',  // Ensures input takes full width by default
                margin: 'auto',   
                fontSize: '15px'
              }}
            />
{/* 
            <h1 className="product-list-title">Product List</h1> */}
            <ul className="product-list">
              {products.map(product => (
                <li key={product.id} className="product-item">
                  <div className="product-item-content" >
                  <div className="product-image" onClick={()=> {handleProductClick(product.id)}}>
                      <img src="https://via.placeholder.com/150" alt={product.name} />
                    </div>
                    <div className="product-details">
                      <h3 className="product-name" onClick={()=> {handleProductClick(product.id)}}>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <p className="product-price">Price: ${product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product.id)} 
                        className="add-to-cart-button"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

        </div>
    );
};

export default Home;
