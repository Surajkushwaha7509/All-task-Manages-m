

const mongoose = require("mongoose");
const tableStructure = new mongoose.Schema({
    itemname:{ type:String, required:true},
    itemprice:{ type:Number, required:true},
    itemdetails:{ type:String, required:true},
})

module.exports= mongoose.model("Item", tableStructure);