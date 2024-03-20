import React, { useEffect, useState } from 'react';
import axios from 'axios';


function PharOutOfStockItems() {
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/stock/out-of-stock-items') // Replace with your backend API URL
      .then((response) => {
        setOutOfStockItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching out-of-stock items', error);
      });
  }, []);

  return (
    <div className="section">
      <h2>Out-of-Stock Items</h2>
      <ul>
        {outOfStockItems.map((item) => (
          <li key={item._id}>
            {item.ProductName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PharOutOfStockItems;