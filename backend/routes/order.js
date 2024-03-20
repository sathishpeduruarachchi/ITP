const express = require("express");
//const router = require ("express").Router();
const router = express.Router();
//const user = require("../models/user.js");
let OrderI = require("../models/Order.js");


//data insert

router.route("/add").post((req,res)=>{
    const order_id = req.body.order_id;
    const supplier = req.body.supplier;
    const date = req.body.date;
    const destination = req.body.destination;
    const quantity = Number(req.body.quantity);

    const newOrderI = new OrderI({
        order_id,
        supplier,
        date,
        destination,
        quantity
    })
  
      
    newOrderI.save().then(()=>{
        res.json("Data is saved by the db");
    }).catch((error)=>{
        console.log(error);
    })
});

//data read

router.get("/", async (req, res) => {
    try {
      const order = await OrderI.find();
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch data from the database" });
    }
  });
// router.route("/").get((req,res)=>{
//     OrderI.find().then((user)=>{
//         res.json(user);
//     }).catch((error)=>{
//         console.log(error)
//     })
// });

router.get("/search", async (req, res) => {
    try {
      const query = req.query.query; // Assuming you send the search query as a query parameter
      const results = await OrderI.find({
        $or: [
          { order_id: { $regex: query, $options: "i" } },
          //{ item_name: { $regex: query, $options: "i" } },
        ],
      });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to search data" });
    }
  });

//data update
router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {order_id,supplier,date,destination,quantity} = req.body;

    const updateUser = {
        order_id,supplier,date,destination,quantity
    }
    const update = await OrderI.findByIdAndUpdate(userID,updateUser).then(()=>{
        res.status(200).send({status:"Order update"});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error updating data!", error:error.message});
    });
});



// router.route("/delete/:id").delete(async(req,res)=>{
//     let userID = req.params.id;
    
//     await OrderI.findByIdAndDelete(userID).then(()=>{
//         res.status(200).send({status:"Order delete"});
//     }).catch((error)=>{
//         console.log(error.message);
//         res.status(500).send({status:"error with delete Order!",error:error.message});
//     })
// })

//data delete
router.delete("/delete/:id", async (req, res) => {
    const userID = req.params.id;
  
    try {
      const deletedOrderI = await OrderI.findByIdAndDelete(userID);
      if (!deletedOrderI) {
        return res.status(404).json({ status: "Order not found" });
      }
      res.status(200).json({ status: "Order deleted" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Error with deleting Order",
        error: error.message,
      });
    }
  });


// Get Inventory by ID
router.get("/get/:id", async (req, res) => {
    const userID = req.params.id;
  
    try {
      const user = await OrderI.findById(userID);
      if (!user) {
        return res.status(404).json({ status: "Order not found" });
      }
      res.status(200).json({ status: "Order fetched", user });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "Error with getting Oder",
        error: error.message,
      });
    }
  });

// router.route("/get/:id").get(async(req,res)=>{
//     let userID = req.params.id;
//     const user = await OrderI.findById(userID).then(()=>{
//         res.status(200).send({status: "Inventory fetched", user})
//     }).catch((error)=>{
//         console.log(error.message);
//         res.status(500).send({status:"error with get Inventory!",error:error.message})
//     })
// })

module.exports = router;