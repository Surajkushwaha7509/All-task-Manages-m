

const mongoose = require("mongoose");
const tableStructure = new mongoose.Schema({
    productname:{ type:String, required:true},
    productprice:{ type:Number, required:true},
    productqty:{ type:Number, required:true},
    productseller:{ type:String, required:true},
    
})

module.exports= mongoose.model("Product", tableStructure);