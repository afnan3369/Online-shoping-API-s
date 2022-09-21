const express= require("express");
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const userRouts= require("./routs/users");
const authRouts= require("./routs/auth");
const productsRouts= require("./routs/product")
const cartRouts= require("./routs/cart")
const orderRouts= require("./routs/order")
const stripeRouts= require("./routs/stripe")


const app= new express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("dbConection succesfull")
}).catch((err)=>{
    console.log(err);
});



app.use(express.json());
app.use("/api/products", productsRouts)
app.use("/api/auth", authRouts)
app.use("/api/user", userRouts)
app.use("/api/products", cartRouts)
app.use("/api/orders", orderRouts)
app.use("/api/stripe", stripeRouts)











app.listen(5000, ()=>{
    console.log("server conected");
});