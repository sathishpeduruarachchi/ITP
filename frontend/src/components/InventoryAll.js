import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryAll = ({ item }) => {
  const [inventory, setInventory] = useState([]);
  const [query, setQuery] = useState("");
  const [editedItem, setEditedItem] = useState(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    axios
      .get(`http://localhost:8070/inventory/`)
      .then((res) => {
        console.log(res.data);
        setInventory(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchInventory = () => {
    if (/^[A-Za-z0-9]+$/.test(query)) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredInventory = inventory.filter((inventoryItem) =>
        inventoryItem.item_id.toLowerCase().includes(lowerCaseQuery)
      );
      setInventory(filteredInventory);
      setSearchError("");
    } else {
      setSearchError("Please enter only item code (letters and numbers).");
    }
  };

  const deleteInventoryItem = (itemId) => {
    axios
      .delete(`http://localhost:8070/inventory/delete/${itemId}`)
      .then((res) => {
        alert("Inventory Deleted");
        console.log("Item deleted");
        getInventory();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const openEditForm = (item) => {
    setEditedItem(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "update_quantity") {
      const newUpdateQuantity = Number(value);
      const newNowAvailableQuantity = editedItem.before_available_quantity + newUpdateQuantity;
      const newIssueQuantity = 0;

      setEditedItem({
        ...editedItem,
        update_quantity: newUpdateQuantity,
        before_available_quantity: editedItem.now_available_quantity,
        now_available_quantity: newNowAvailableQuantity,
        issue_quantity: newIssueQuantity,
      });
    } else if (name === "issue_quantity") {
      const newIssueQuantity = Number(value);
      const newNowAvailableQuantity = editedItem.now_available_quantity - newIssueQuantity;
      const newUpdateQuantity = 0;

      setEditedItem({
        ...editedItem,
        issue_quantity: newIssueQuantity,
        now_available_quantity: newNowAvailableQuantity,
        update_quantity: newUpdateQuantity,
      });
    } else {
      setEditedItem({
        ...editedItem,
        [name]: value,
      });
    }
  };

  const saveEditedItem = () => {
    axios
      .put(`http://localhost:8070/inventory/update/${editedItem._id}`, editedItem)
      .then((res) => {
        alert("Inventory Updated");
        console.log("Item updated");
        setInventory((prevInventory) => {
          const updatedInventory = prevInventory.map((item) => {
            if (item._id === editedItem._id) {
              return editedItem;
            } else {
              return item;
            }
          });
          return updatedInventory;
        });
        setEditedItem(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancelEdit = () => {
    setEditedItem(null);
  };

  return (
    <div>
      <input
        type="text"
        onKeyUp={searchInventory}
        onKeyDown={searchInventory}
        className="search-tests-input"
        placeholder="Search by Item ID"
        onChange={(e) => {
          setQuery(e.target.value);
          setSearchError("");
        }}
      />
      {searchError && <p className="search-error">{searchError}</p>}
      <table className="tests-table">
        <thead>
          <tr className="th-tests">
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Added Quantity</th>
            <th>Before Available QTY</th>
            <th>Update Quantity</th>
            <th>Now Available QTY</th>
            <th>Issue QTY</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((inventoryItem) => (
            <tr className="tr-tests" key={inventoryItem._id}>
              <td>{inventoryItem.item_id}</td>
              <td>{inventoryItem.item_name}</td>
              <td>{inventoryItem.category}</td>
              <td>{inventoryItem.adding_quantity}</td>
              <td>{inventoryItem.before_available_quantity}</td>
              <td>{inventoryItem.update_quantity}</td>
              <td>{inventoryItem.now_available_quantity}</td>
              <td>{inventoryItem.issue_quantity}</td>
              <td>
                <a
                  href="#"
                  type="button"
                  className="delete-inventory-btn"
                  onClick={() => deleteInventoryItem(inventoryItem._id)}
                >
                  Delete
                </a>
                <a
                  href="#"
                  type="button"
                  className="add-inventory-for"
                  onClick={() => openEditForm(inventoryItem)}
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editedItem && (
        <div className="edit-form">
          <h3>Edit Item</h3>
          <label>
            Item Name:
            <input
              type="text"
              name="item_name"
              value={editedItem.item_name}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={editedItem.category}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Update Quantity:
            <input
              type="text"
              name="update_quantity"
              value={editedItem.update_quantity}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Issue QTY:
            <input
              type="text"
              name="issue_quantity"
              value={editedItem.issue_quantity}
              onChange={handleEditChange}
            />
          </label>
          {/* Add input fields for other fields here */}
          <button onClick={saveEditedItem}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default InventoryAll;
