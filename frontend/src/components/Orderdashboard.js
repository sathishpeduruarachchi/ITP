import React from "react";
import DashboardHeader from "./DashboardHeader";
import AddOrder from "./AddOrder";
import AllOrder from "./AllOrder";

const Orderdashboard =()=>{
    return(

        <div>
        <DashboardHeader />
        
        
        <div className="main-container">
        <div className="nav-bar">
        <ul className="nav-list">
        <a href="/inventory">
              <li className="nav-element">Inventory</li>
            </a>
            
        </ul>
        </div>
        <div className="content-container">
        <AddOrder/>
        <AllOrder/>
        </div>
        </div>
       </div>
    )
}

export default Orderdashboard;