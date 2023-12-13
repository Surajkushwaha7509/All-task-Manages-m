const express = require("express");
const router = express.Router();
module.exports = router;

const Item = require("./itemschema");

router.post("/", async(req, res)=>{

    let itemlist = await Item.find();   // Fetch all data

    const results = itemlist.filter(item=>
        item.itemname.toLowerCase().includes(req.body.mykeyword.toLowerCase())
    );
    
    res.status(200).json(results);
});