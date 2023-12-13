const express = require("express");
const router = express.Router();
module.exports = router;

const Item = require("./itemschema");

router.get("/", async(req, res)=>{ 
    let itemlist = await Item.find();
    res.status(200).json(itemlist);
})

router.post("/", async(req, res)=>{
    let newitem = new Item({
        "itemname":req.body.name,
        "itemprice":req.body.price,
        "itemdetails":req.body.details
    });
    let iteminfo = await newitem.save();
    res.status(201).json(iteminfo);
})

router.get("/:id", async(req, res)=>{ 
    let itemdetails = await Item.findById( req.params.id );
    res.status(200).json(itemdetails);
})

router.put("/", async(req, res)=>{
    let iteminfo = await Item.findById(req.body.itemid);
    if( iteminfo == null ){
        res.status(201).json( {"msg" : "Item ID Not Exists..."} );
    }
    else{
        iteminfo.itemname = req.body.name;
        iteminfo.itemprice = req.body.price;
        iteminfo.itemdetails = req.body.details;
        await iteminfo.save();
        res.status(201).json( {"msg" : "Updated Successfully..."} );
    }
})

router.delete("/:id", async (req, res)=>{
    let iteminfo = await Item.findById(req.params.id);
    if( iteminfo == null ){
        res.status(201).json( {"msg" : "Sorry, Item Dose Not Exists..."} );
    }
    else{
        await iteminfo.deleteOne();
        res.status(201).json( {"msg" : "Item Deleted Successfully..."} );
    }
})