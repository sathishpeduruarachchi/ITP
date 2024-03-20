import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import '../styles/PharHome.css'

function ExpiredItems() {
  const [expiredItems, setExpiredItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/stock/expired-items')
      .then((response) => {
        setExpiredItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expired items', error);
      });
  }, []);

  return (
    <div className='section'>
      <h2>Expired Items</h2>
      <ul>
        {expiredItems.map((item) => (
          <li key={item._id}>
            {item.ProductName} (Exp. {new Date(item.ExpDate).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpiredItems;