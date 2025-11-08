"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingCart = () => {
  // State to keep track of the items in the shopping cart
  const [cartItems, setCartItems] = useState([]);

  // State to keep track of the total value
  const [totalValue, setTotalValue] = useState(0);

  // Fetch car data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://myfakeapi.com/api/cars/');
          console.log('API Response:', response.data);
          //  
          setCartItems(response.data.cars); // Adjust this line based on the actual data structure
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  // Function to calculate the total value of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total: any, item: any) => total + parseFloat(item.price.replace('$', '')), 0);
  };

  // Update the total value whenever cartItems changes
  useEffect(() => {
    setTotalValue(calculateTotal());
  }, [cartItems]);

  // JSX rendering of the component
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item: any) => (
          <li key={item.id}>
            {item.car} - {item.price}
          </li>
        ))}
      </ul>
      <p>Total: ${totalValue}</p>
    </div>
  );
};

export default ShoppingCart;
