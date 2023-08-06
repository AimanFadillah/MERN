import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function Barang() {
  const [Product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    const response = await axios.get(`http://localhost:5000/product?search=${search}`)
    setProduct(response.data);
    response.data.length === 0 ? setPesan("Maaf Barang Sedang Kosong") : setPesan("");
  }

  async function FormDelete(id) {
    const check = window.confirm("Yakin")
    if (!check) return false;
    await axios.delete(`http://localhost:5000/product/${id}`)
    getProduct();
  }

  function Search(value) {
    setSearch(value)
    getProduct();
  }


  return (
    <div className='container mt-3'>
      <div className="d-flex align-items-center">
        <h2>Semua Product</h2>
        <Link className="badge bg-success m-3 text-decoration-none" to="/Create" >Buat Product</Link>
      </div>
      <div className="row">
        <div className="col-md-12 mb-4">
          <input type="text" className="form-control" placeholder="Cari Product" onInput={(e) => Search(e.target.value)} ></input>
        </div>
        <h6 className='text-center text-secondary' >{pesan}</h6>
        {Product.map((product) => (
          <div className="col-md-3 mb-5" key={product.id}>
            <div className="card">
              <img src={product.url} className="card-img-top" alt={product.name}></img>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="">
                  <Link to={`/Edit/${product.id}`} className="badge bg-primary me-1 text-decoration-none" >Edit</Link>
                  <div onClick={() => FormDelete(product.id)} className="badge bg-danger text-decoration-none">Hapus</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Barang
