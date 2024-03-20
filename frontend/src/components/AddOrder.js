import React, { useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:8070/order/add";

const AddOrder = () => {
  const [order_id, setOrder_id] = useState("");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState("");

  // Error state variables
  const [orderError, setOrderError] = useState("");
  const [supplierError, setSupplierError] = useState("");
  const [dateError, setDateError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const handleOrderChange = (e) => {
    setOrder_id(e.target.value);
    // Validation as the user types
    const orderPattern = /^(PH|LA)\d{3}$/;
    if (!orderPattern.test(e.target.value)) {
      setOrderError("Order ID should start with 'PH' or 'LA' followed by exactly 3 digits.");
    } else {
      setOrderError("");
    }
  };

  const handleSupplierChange = (e) => {
    const newValue = e.target.value;
    setSupplier(newValue);

    // Validation: Supplier should contain only alphabetic characters
    const supplierPattern = /^[A-Za-z]+$/;
    if (!supplierPattern.test(newValue)) {
      setSupplierError("Supplier should contain only alphabetic characters.");
    } else {
      setSupplierError("");
    }
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setDate(newValue);

    // Validation: Date should be today or a future date
    const today = new Date();
    const selectedDate = new Date(newValue);

    if (isNaN(selectedDate.getTime())) {
      setDateError("Invalid date format. Please use yyyy-mm-dd.");
    } else if (selectedDate < today) {
      setDateError("Date must be today or a future date.");
    } else {
      setDateError("");
    }
  };

  const handleQuantityChange = (e) => {
    const newValue = e.target.value;
    setQuantity(newValue);

    // Validation: Quantity should be an integer
    const quantityPattern = /^[0-9]+$/;
    if (!quantityPattern.test(newValue)) {
      setQuantityError("Quantity should be an integer (positive whole number).");
    } else {
      setQuantityError("");
    }
  };

  const addOrder = async (e) => {
    e.preventDefault();

    // Validate fields once again before submitting the form
    const orderPattern = /^(PH|LA)\d{3}$/;
    const today = new Date(); // Get the current date

    if (!orderPattern.test(order_id)) {
      setOrderError("Order ID should start with 'PH' or 'LA' followed by exactly 3 digits.");
      return;
    }

    // Validate the date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      setDateError("Invalid date format. Please use yyyy-mm-dd.");
      return;
    }

    // Ensure the selected date is today or a future date
    if (selectedDate < today) {
      setDateError("Date must be today or a future date.");
      return;
    }

    // Validate quantity
    const quantityPattern = /^[0-9]+$/;
    if (!quantityPattern.test(quantity)) {
      setQuantityError("Quantity should be an integer (positive whole number).");
      return;
    }

    // Other validations for destination can be added here as needed.

    const newOrder = {
      order_id,
      supplier,
      date,
      destination,
      quantity,
    };

    axios
      .post(apiUrl, newOrder)
      .then((res) => {
        alert("Order Created");
        // Optionally, you can clear the form fields here.
        setOrder_id("");
        setSupplier("");
        setDate("");
        setDestination("");
        setQuantity("");
        // Clear error messages
        setOrderError("");
        setSupplierError("");
        setDateError("");
        setQuantityError("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="add-order-inputs">
      <form action="" onSubmit={addOrder}>
        <h2>Make Order</h2>
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Order ID (e.g: PH123 or LA456)"
          value={order_id}
          onChange={handleOrderChange}
        />
        {orderError && <p className="error-message">{orderError}</p>}
        <br />
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Supplier"
          value={supplier}
          onChange={handleSupplierChange}
        />
        {supplierError && <p className="error-message">{supplierError}</p>}
        <br />
        <input
          className="add-staff-inputs"
          type="date"
          placeholder="Create Order Date"
          value={date}
          onChange={handleDateChange}
        />
        {dateError && <p className="error-message">{dateError}</p>}
        <br />
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Order Destination"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />
        <br />
        <input
          className="add-staff-inputs"
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
        {quantityError && <p className="error-message">{quantityError}</p>}
        <br />
        <button type="submit" id="add-staff-button">
          Make Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
