import express from "express";
import {getKategori,getKategoriId,saveKategori,updateKategori,deleteKategori} from "../controller/KategoriController.js";

const route = express.Router();

route.get("/kategori",getKategori);
route.post("/kategori",saveKategori);
route.get("/kategori/:id",getKategoriId);
route.patch("/kategori/:id",updateKategori);
route.delete("/kategori/:id",deleteKategori);

export default route;
