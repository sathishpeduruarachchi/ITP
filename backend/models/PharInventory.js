const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({

    ProductName: {
        type: String,
        required: true
    },
    GenericName: {
        type: String,
        required: true
    },
    Dosage: {
        type: String
    },
    ReferenceNo: {
        type: Number,
        required: true,
        unique: true,
    },

    Category: {
        type: String
    },
    Type: {
        type: String
    },
    MfgDate: {
        type: Date
    },
    ExpDate: {
        type: Date,
        required: true
    },
    Description: {
        type: String
    },
    Quantity: {
        type: Number,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Image: {
        type: Buffer,
    }

})

const PharInventory = mongoose.model("Stock", inventorySchema);
module.exports = PharInventory;