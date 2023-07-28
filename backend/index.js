import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js"

const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(ProductRoute);
app.use(express.static("public"))


app.get("/",(req,res) => res.send("hello word")) 

app.listen(port,() => console.log(`serve berjalan di http://localhost:${port}`))