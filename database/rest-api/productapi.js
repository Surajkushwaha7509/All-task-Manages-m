const express = require("express");
const router = express.Router();
module.exports = router;

const Product = require("./productschema");

router.get("/", async(req, res)=>{ 
    let productlist = await Product.find();
    res.status(200).json(productlist);
})

router.post("/", async(req, res)=>{
    let newproduct = new Product({
        "productname":req.body.pname,
        "productprice":req.body.price,
        "productqty":req.body.qty,
        "productseller":req.body.seller
    });
    let productinfo = await newproduct.save();
    res.status(201).json(productinfo);
})

router.get("/:id", async(req, res)=>{ 
    let productdetails = await Product.findById( req.params.id );
    res.status(200).json(productdetails);
})

router.put("/", async(req, res)=>{
    let productinfo = await Product.findById(req.body.productid);
    if( productinfo == null ){
        res.status(201).json( {"msg" : "product ID Not Exists..."} );
    }
    else{
        productinfo.productname = req.body.pname;
        productinfo.productprice = req.body.price;
        productinfo.productqty = req.body.qty;
        productinfo.productseller = req.body.seller;
        await productinfo.save();
        res.status(201).json( {"msg" : "Updated Successfully..."} );
    }
})

router.delete("/:id", async (req, res)=>{
    let productinfo = await Product.findById(req.params.id);
    if( productinfo == null ){
        res.status(201).json( {"msg" : "Sorry, product Dose Not Exists..."} );
    }
    else{
        await productinfo.deleteOne();
        res.status(201).json( {"msg" : "product Deleted Successfully..."} );
    }
})