import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controller/ProductController.js"

const router = express.Router();

router.get("/product",getProducts)
router.get("/product/:id",getProductById)
router.post("/product",saveProduct)
router.patch("/product/:id",updateProduct)
router.delete("/product/:id",deleteProduct)

// console.log(router)
export default router; 