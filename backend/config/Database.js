import { Sequelize } from "sequelize";

const db = new Sequelize("mern","root","",{
    host:"localhost",
    dialect:"mysql",
})

export default db;