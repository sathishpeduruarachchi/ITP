// AddInventory.js

import React, { useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:8070/inventory/add";

const AddInventory = () => {
  const [item_id, setItem_id] = useState("");
  const [item_name, setItem_name] = useState("");
  const [category, setCategory] = useState("PHARMACY");
  const [adding_quantity, setAdding_quantity] = useState("");
  const [item_idError, setItem_idError] = useState("");
  const [adding_quantityError, setAdding_quantityError] = useState("");

  const validateItemId = (value) => {
    const idPattern = /^(PH|LA)\d+$/;
    if (!idPattern.test(value)) {
      setItem_idError("Item ID should start with 'PH' or 'LA' followed by numbers.");
    } else {
      setItem_idError("");
    }
  };

  const validateAdding_quantity = (value) => {
    if (isNaN(value) || value === "") {
      setAdding_quantityError("Quantity should be a valid number.");
    } else {
      setAdding_quantityError("");
    }
  };

  const addInventory = async (e) => {
    e.preventDefault();

    validateItemId(item_id);
    validateAdding_quantity(adding_quantity);

    if (item_idError || adding_quantityError) {
      return;
    }

    const newInventory = {
      item_id,
      item_name,
      category,
      adding_quantity,
      before_available_quantity: 0,
      update_quantity: 0,
      now_available_quantity: 0,
      issue_quantity: 0,
    };

    axios
      .post(apiUrl, newInventory)
      .then((res) => {
        alert("Inventory Created");
        setItem_id("");
        setItem_name("");
        setCategory("PHARMACY");
        setAdding_quantity("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="add-inventory-container">
      <form action="" onSubmit={addInventory}>
        <h1>Add Inventory</h1>
        <div className="form-group">
          <input
            className="add-staff-inputs"
            type="text"
            placeholder="Items code (e.g: PH123 or LA456)"
            value={item_id}
            onChange={(e) => {
              setItem_id(e.target.value);
              validateItemId(e.target.value);
            }}
            required
          />
          {item_idError && <div className="error-message">{item_idError}</div>}
        </div>
        <div className="form-group">
          <input
            className="add-staff-inputs"
            type="text"
            placeholder="Items name"
            value={item_name}
            onChange={(e) => {
              setItem_name(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
         
          <select
            className="add-staff-inputs"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="PHARMACY">PHARMACY</option>
            <option value="LABORATORY">LABORATORY</option>
          </select>
        </div>
        <div className="form-group">
          <input
            className="add-staff-inputs"
            type="text"
            placeholder="Add Quantity"
            value={adding_quantity}
            onChange={(e) => {
              setAdding_quantity(e.target.value);
              validateAdding_quantity(e.target.value);
            }}
            required
          />
          {adding_quantityError && (
            <div className="error-message">{adding_quantityError}</div>
          )}
        </div>
        <button type="submit" id="add-staff-button">
          Inventory+
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
