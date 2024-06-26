import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';

const Profile = ({ logged, setLogged, id, setId }) => {
    const [customer, setCustomer] = useState(null);
    const { pid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (logged) {
            axios.get(`http://localhost:8080/api/customers/${id}`)
                .then(response => {
                    setCustomer(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the customer data!', error);
                });
        }
        else
            navigate('/login');
    }, [logged, id]);

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-item">
                <strong>Name:</strong> {customer.username}
            </div>
            <div className="profile-item">
                <strong>Billing Address:</strong> {customer.billingAddress}
            </div>
            <div className="profile-item">
                <strong>Phone:</strong> {customer.phoneNumber}
            </div>
            <div className="profile-item">
                <strong>Email:</strong> {customer.email}
            </div>
        </div>
    );
};

export default Profile;
