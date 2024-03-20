// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import DashboardHeader from "./DashboardHeader";
// import SideBar from "./SideBar";

// const EditInventory = () => {
//   const { IntId } = useParams();
//   const [item_id, setItem_id] = useState("");
//   const [item_name, setItem_name] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const [inventory, setInventory] = useState([]);
//   const [isEditing, setIsEditing] = useState(false); // Add state for editing mode

//   // Initialize navigate using useNavigate
//   const navigate = useNavigate();

//   useEffect(() => {
//     getInventory();
//   }, []);

//   const editInventory = async (e) => {
//     e.preventDefault();
//     const updateInventory = {
//       item_id,
//       item_name,
//       category,
//       quantity,
//     };

//     try {
//       const response = await axios.put(`http://localhost:8070/inventory/update/${IntId}`, updateInventory);
//       if (response.data.success) {
//         alert("Inventory Updated");
//         setIsEditing(false); // Exit editing mode
//       } else {
//         alert("Failed to update inventory");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while updating inventory");
//     }
//   };

//   const getInventory = async () => {
//     axios
//       .get(`http://localhost:8070/inventory/get/${IntId}`)
//       .then((res) => {
//         console.log(res.data.inventory);
//         setInventory(res.data.inventory);
//         setItem_id(res.data.inventory.item_id);
//         setItem_name(res.data.inventory.item_name);
//         setCategory(res.data.inventory.category);
//         setQuantity(res.data.inventory.quantity);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <DashboardHeader />

//       <div className="content-container">
//         <div className="add-staff-container">
//           <form action="" onSubmit={editInventory}>
//             <h1>Edit Inventory</h1>
//             {isEditing ? (
//               <>
//                 <input
//                   className="add-staff-inputs"
//                   type="text"
//                   placeholder="Item code"
//                   value={item_id}
//                   onChange={(e) => setItem_id(e.target.value)}
//                 />{" "}
//                 <br />
//                 <input
//                   className="add-staff-inputs"
//                   type="text"
//                   placeholder="Item Name"
//                   value={item_name}
//                   onChange={(e) => setItem_name(e.target.value)}
//                 />{" "}
//                 <br />
//                 <input
//                   className="add-staff-inputs"
//                   type="text"
//                   placeholder="Category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />{" "}
//                 <br />
//                 <input
//                   className="add-staff-inputs"
//                   type="text"
//                   placeholder="Quantity"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />{" "}
//                 <br />
//               </>
//             ) : (
//               <>
//                 <p>Item ID: {item_id}</p>
//                 <p>Item Name: {item_name}</p>
//                 <p>Category: {category}</p>
//                 <p>Quantity: {quantity}</p>
//               </>
//             )}
//             <button type="submit" id="add-staff-button">
//               Update and Save
//             </button>
//           </form>
//           <button
//             type="button"
//             onClick={() => navigate('/inventory')} // Redirect to your desired path
//           >
//             Cancel
//           </button>
//           <button onClick={() => setIsEditing(!isEditing)}>
//             {isEditing ? "Cancel Edit" : "Edit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditInventory;
