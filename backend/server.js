import express from "express";
import dotenv from "dotenv";
import path from "path"; //built-in node module
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

//create a express app
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors(
    {
        origin: ["https://project-frontend-sandy.vercel.app/"],
        method: ["POST", "GET"],
        credentials: true
    }
));

//allows to accept JSON data in req.body(middleware)
app.use(express.json());

//function to get the routes(endpoints)
app.use("/api/products", productRoutes); //the endpoint in the routes files should be prefixed with -> /api/products for eg: /api/products/ or /api/products/id 

//to check the environment(production or development)
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}



//app listen to the port 
app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})

