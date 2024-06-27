import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import '../css/AddProduct.css';

const AddProduct = ({ setShowPopup, setPopupMsg, logged, setLogged, id, setId }) => {
    const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    stock: '',
    imageUrl: '',
    price: '',
    categoryName: '',
    sellerId: id
  });
  const [showMsg, setShowMsg] = useState(false);
    const handleCategoryChange = async (event) => {
      setProduct({
        ...product,
        ["categoryName"]: event.target.value
      });
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  useEffect(()=>{
    if (!logged)
        navigate('/login');
  }, [logged]
);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(product)
    await axiosInstance.post(`http://localhost:8080/api/sellers/${id}/products`, product);
    setShowPopup(true);
    setPopupMsg("New Product added");
    setShowMsg(true);
    console.log(product);
  };

  return (
    <>{!showMsg && (<form onSubmit={handleSubmit} className="add-product-form">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="productName"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          min="1"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          min="1"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Category</label>
      <select
        id="category"
        name="categoryName"
        onChange={handleCategoryChange}
      >
        <option value="Clothing">Clothing</option>
        <option value="Sports">Sports</option>
        <option value="Footwear">Footwear</option>
        <option value="Furniture">Furniture</option>
      </select>

            
      </div>
      <button type="submit" className="submit-btn">Add Product</button>
    </form>)}

    {showMsg && (
        <>
        New product added successfully!
        <br></br>
      <button onClick={()=>setShowMsg(false)} className="submit-btn">Add Another Product</button>
      </>
    )}
    </>

    
  );
};

export default AddProduct;
