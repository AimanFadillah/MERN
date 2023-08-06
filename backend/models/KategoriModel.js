import db from "../config/Database.js";
import { Sequelize } from "sequelize";

const {DataTypes} = Sequelize;

const Kategori = db.define("kategori",{
    name:DataTypes.STRING,
},{
    freezeTableName:true,
})

await Kategori.sync();



export default Kategori;
