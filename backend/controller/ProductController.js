import Product from "../models/ProductModel.js";
import {v4} from "uuid";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getProducts = async (req,res) => {
    const search = req.query.search || "";
    try{
        const response = await Product.findAll({
            where:{
                [Op.or] : [{name:{
                    [Op.like]:"%" + search + "%"
                }}]
            }
        });
        res.json(response)
    }catch (error){
        console.log(error.message)
    }   
}

export const getProductById = async (req,res) => {
    try{
        const response = await Product.findOne({
            where:{
                id:req.params.id
            }
        })
        res.json(response)
    }catch{
        console.log(error.message);
    }
}
export const saveProduct = (req,res) => {
    if(req.files === null){return res.status(400).json({msg:"Tidak Upload Gambar"})}
    const name = req.body.name ;
    const image = req.files.image;
    const fileSize = image.data.length;

    const ext = path.extname(image.name);
    const fileName = v4() + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = [".jpg",".jpeg",".png"]
        
    if(!allowedType.includes(ext.toLocaleLowerCase())){return res.status(422).json({msg:"Yang Diupload bukan gambar"}) }
    if(fileSize > 5000000){ return res.status(422).json({msg:"Gambar maksimal 5 mb"})}

    image.mv(`./public/images/${fileName}/`,async (err) => {
        if(err) { return res.status(500).json({msg:err.message}) }
        try{
            await Product.create({
                name:name,
                image:fileName,
                url:url,
            })
            res.status(201).json({"msg":"Data Berhasil dimasukkan"})
        }catch(error){
            console.log(error.message)
        }
    })
}
export const updateProduct = async (req,res) => {
    const product = await Product.findOne({
        where:{
            id:req.params.id
        }
    })
    if(!product){ return res.status(404).json({msg:"Barang Tidak ditemukkan"}) }
    let fileName = "";
    if(req.files === null){
        fileName = product.image;
    }else{
        const image = req.files.image;
        const fileSize = image.data.length;
        const ext = path.extname(image.name);
        fileName = v4() + ext;
        const allowedType = [".jpg",".jpeg",".png"]

        if(!allowedType.includes(ext.toLocaleLowerCase())){return res.status(422).json({msg:"Yang Diupload bukan gambar"}) }
        if(fileSize > 5000000){ return res.status(422).json({msg:"Gambar maksimal 5 mb"})}

        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);

        image.mv(`./public/images/${fileName}/`,(err) => {
            if(err) { return res.status(500).json({msg:err.message}) }
        })
    }

    const name = req.body.name ;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    try{
        await Product.update({
            name:name,
            image:fileName,
            url:url,

        },{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg:"Product Berhasil diubah"})
    }catch (error) {
        console.log(error.message)
    }
}


export const deleteProduct = async (req,res) => {
    const product = await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product){ return res.status(404).json({msg:"Barang tidak ditemukkan"}) }
    try{
        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);
        await Product.destroy({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({msg:"barang berhasil dihapus"})
    }catch(error){
        console.log(error.message)
    }
}