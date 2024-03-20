const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    item_id :{
        type : String,
        required : true
    },
    item_name : {
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    adding_quantity :{
        type : Number,
        required : true
    },
    before_available_quantity :{
        type : Number,
        required : true
    },
    update_quantity :{
        type : Number,
        required : true
    },
    now_available_quantity :{
        type : Number,
        required : true
    },
    issue_quantity :{
        type : Number,
        required : true
    }
});
const Inventory = mongoose.model("inventory", InventorySchema);
module.exports = Inventory;