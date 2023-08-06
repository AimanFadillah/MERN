import Kategori from "../models/KategoriModel.js";

export async function getKategori (req,res) {
    const data = await Kategori.findAll();
    res.json(data);
}

export async function getKategoriId (req,res){
    const data = await Kategori.findOne({where:{id:req.params.id}})
    res.json(data);
}

export async function saveKategori (req,res) {
    const data = await Kategori.create({name:req.body.name})
    res.json(data);
}

export async function updateKategori (req,res){
    const data = await Kategori.update({name:req.body.name},{where:{id:req.params.id}});
    res.json("berhasil diupdate")
}

export async function deleteKategori (req,res){
    const data = await Kategori.destroy({where:{id:req.params.id}});
    res.json("berhasil dihapus");
}