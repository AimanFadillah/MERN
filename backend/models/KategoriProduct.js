import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kategori from "./KategoriModel.js";
import Product from "./ProductModel.js";

const {DataTypes} = Sequelize;

const KategoriProduct = db.define("KategoriProduct",{

})

Kategori.belongsToMany(Product,{through:"KategoriProduct"}); 
Product.belongsToMany(Kategori,{through:"KategoriProduct"});

await KategoriProduct.sync();

export default KategoriProduct;



