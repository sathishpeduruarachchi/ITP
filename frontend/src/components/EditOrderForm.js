// // EditOrderForm.js
// import React from "react";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// function EditOrderForm({ order, isOpen, onRequestClose, onSave, onCancel }) {
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Order Form">
//       <h2>Edit Order</h2>
//       <label>
//         Supplier:
//         <input type="text" name="supplier" value={order.supplier} onChange={onSave} />
//       </label>
//       <label>
//         Date:
//         <input type="date" name="date" value={order.date} onChange={onSave} />
//       </label>
//       <label>
//         Destination:
//         <input type="text" name="destination" value={order.destination} onChange={onSave} />
//       </label>
//       <label>
//         Quantity:
//         <input type="number" name="quantity" value={order.quantity} onChange={onSave} />
//       </label>
//       <button onClick={onCancel}>Cancel</button>
//       <button onClick={onSave}>Save</button>
//     </Modal>
//   );
// }

// export default EditOrderForm;
