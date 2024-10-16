import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

//create a express app
const app = express();
const PORT = process.env.PORT || 5000

//allows to accept JSON data in req.body(middleware)
app.use(express.json());

//function to get the routes(endpoints)

app.use("/api/products", productRoutes); //the endpoint in the routes files should be prefixed with -> /api/products for eg: /api/products/ or /api/products/id 

//app listen to the port 
app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})