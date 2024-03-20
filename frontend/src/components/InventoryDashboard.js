import React from "react";
import DashboardHeader from "./DashboardHeader";
import AddInventory from "./AddInventory";
import InventoryAll from "./InventoryAll";
// import DoughnutChart from "./components/InventoryDoughnutChart";
import DoughnutChart from "./DoughnutChart";


const InventoryDashboard =()=>{
    return(

        <div>
        <DashboardHeader />
        
        <div className="main-container">
        <div className="nav-bar">

        <ul className="nav-list">     
            <a href="/order">
              <li className="nav-element">Order</li>
              
            </a>
            </ul>   
        </div>

        <div className="content-container">
        <AddInventory />
        <InventoryAll/>
        <DoughnutChart/>
        </div>
      </div>
     </div>
        
       
  )
}

export default InventoryDashboard;