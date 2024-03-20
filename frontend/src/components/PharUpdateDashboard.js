import React from "react";
import DashboardHeader from "./DashboardHeader";
import PharHomePage from "./PharHomePage";
import AddPharmacyItems from "./AddPharmacyItems";
import PharItemDetails from "./PharItemDetails";
import PharPrescription from "./PharPrescription";
import PharItemUpdate from "./PharItemUpdate";
import "../styles/dashboard.css";





const PharUpdateDashboard = () => {

    
    return (

        <div>
            <DashboardHeader/>

            <div className="main-container">
                <div className="nav-bar">

                    <ul className="nav-list">
                    <a href="/laboratory">
                            <li className="nav-element">Main Menu</li>
                        </a>

                    <a href="/pharmacy">
                            <li className="nav-element">Home</li>
                        </a>

                        <a href="/pharmacyAdd">
                            <li className="nav-element">Add Pharmacy Items</li>
                        </a>
                        <a href="/pharmacyStock">
                        
                            <li className="nav-element active-element">Stock</li>
                        </a>
                        <a href="/prescription">
                        
                            <li className="nav-element">Prescriptions</li>
                        </a>
                      
                    

                       

                    </ul>
                </div>
                <div className="content-container">
         <PharItemUpdate/>
         
        </div>
                

            </div>
            
            
        </div>


    )
}

export default PharUpdateDashboard;