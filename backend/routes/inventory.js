const express = require("express");
const router = express.Router();
let Inventory = require("../models/Inventory.js");

// Data Insert
router.post("/add", async (req, res) => {
  try {
    const {
      item_id,
      item_name,
      category,
      adding_quantity,
    } = req.body;

    // Calculate values for other fields
    const before_available_quantity = adding_quantity;
    const update_quantity = 0;
    const now_available_quantity = adding_quantity;
    const issue_quantity = 0;

    const newInventory = new Inventory({
      item_id,
      item_name,
      category,
      adding_quantity,
      before_available_quantity,
      update_quantity,
      now_available_quantity,
      issue_quantity,
    });

    // Save the data to the database
    await newInventory.save();
    res.json("Data is saved by the db");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save data to the database" });
  }
});

// Data Read
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from the database" });
  }
});

// Data Search
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query; // Assuming you send the search query as a query parameter
    const results = await Inventory.find({
      $or: [
        { item_id: { $regex: query, $options: "i" } },
        { item_name: { $regex: query, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search data" });
  }
});

// Data Update
router.put("/update/:id", async (req, res) => {
  const userID = req.params.id;
  const {
    item_id,
    item_name,
    category,
    before_available_quantity,
    update_quantity,
    now_available_quantity,
    issue_quantity,
  } = req.body;

  const updateUser = {
    item_id,
    item_name,
    category,
    before_available_quantity,
    update_quantity,
    now_available_quantity,
    issue_quantity,
  };

  try {
    const update = await Inventory.findByIdAndUpdate(userID, updateUser);
    if (!update) {
      return res.status(404).json({ status: "Inventory not found" });
    }
    res.status(200).json({ status: "Inventory updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error updating data",
      error: error.message,
    });
  }
});

// Data Delete
router.delete("/delete/:id", async (req, res) => {
  const userID = req.params.id;

  try {
    const deletedInventory = await Inventory.findByIdAndDelete(userID);
    if (!deletedInventory) {
      return res.status(404).json({ status: "Inventory not found" });
    }
    res.status(200).json({ status: "Inventory deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "Error with deleting inventory",
      error: error.message,
    });
  }
});

// Get Inventory by ID
router.get("/get/:id", async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await Inventory.findById(userID);
    if (!user) {
      return res.status(404).json({ status: "Inventory not found" });
    }
    res.status(200).json({ status: "Inventory fetched", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "Error with getting inventory",
      error: error.message,
    });
  }
});

module.exports = router;
