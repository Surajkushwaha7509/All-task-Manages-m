
const express = require("express"); //calling Express Framework
const app = express();              //creating Object Of Express
const cors = require("cors");       //calling cors origin Library
app.use( cors() );                  //calling object cors  Library
app.use(express.json());            //injecting .json to send and recived data in json format between clint and server

//Db connection 
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopping", {UseNewUrlParser:true})
const db = mongoose.connection;

db.on("error", (error)=>console("Error in database connection"));
db.on("open", ()=>console.log("Data Base Is Connected....."));

const Item = require("./itemapi");
app.use("/itemlist", Item) //http://localhost:1111/itemlist - (get, post, put ,  delete)


const Product = require("./productapi");
app.use("/productlist", Product) //http://localhost:1111/productlist - (get, post, put ,  delete)


const Search = require("./search");
app.use("/searchapi", Search) //http://localhost:1111/searchapi - (search)

const Myadmin = require("./myadminapi");
app.use("/auth", Myadmin) //http://localhost:1111/auth - (login)


app.listen(1111, ()=>console.log("the Server is Live Now...."));