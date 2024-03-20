import React from 'react';

import PharmacyDashboard from './PharmacyDashboard';
import ExpiredItems from './ExpiredItems';
import PharOutOfStockItems from './PharOutOfStockItems';
import '../styles/PharHome.css'

function PharHomePage() {
  return (
    <div className='main-content'>
        <img className='logo' src="/images/Pharmacy.png" alt="image description"/>

      <PharOutOfStockItems/>
      <ExpiredItems/>
    
    </div>
  );
}

export default PharHomePage;