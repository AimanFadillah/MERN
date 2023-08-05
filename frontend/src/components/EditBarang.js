import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBarang = () => {
    const [title,setTitle] = useState("");
    const [preview,setPreview] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function getProduct () {
        const response = await axios.get(`http://localhost:5000/product/${id}/`)
        setTitle(response.data.name);
        setPreview(response.data.url); 
    }

    function ValindasiAndPreview (e) {
        const img = e.target.files[0];
        const imgType = img.type;
        const imgSize = img.size;
        const izinType = ["jpg","jpeg","png"];
        const imgObjeck = new Image()
    
        if(!izinType.includes(imgType.split("/")[1])){
            alert("Invalid image file type");
            failedCheck()
            return false;
        }
    
        if(imgSize > 3 * 1024 * 1024 ){
            alert("Image file size is too large. Maximum 5MB")
            failedCheck()
            return false;
        }
    
        imgObjeck.src = URL.createObjectURL(img);
        imgObjeck.onload = () => {
            const check = imgObjeck.width < 100 || imgObjeck.height < 100 ? false : true;
            if(!check){
                alert("Invalid image dimensions. Minimum 100x100 pixels.")
                failedCheck()
                return false;
            }else{
                const fileReader = new FileReader()
                fileReader.readAsDataURL(e.target.files[0])    ;
                fileReader.onload = (fileReader) => {
                    setPreview(fileReader.target.result)
                }
            }
        }
    
        function failedCheck (){
            e.target.value = null;
            getProduct();
        }
    }

    async function FormCreate (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        await axios.patch(`http://localhost:5000/product/${id}/`,formData)
        return navigate("/")
    }


    return (
        <div className='container mt-5' >
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="border p-4 shadow rounded">
                        <form onSubmit={(e) => FormCreate(e)}>
                            <h3>Edit Product</h3>
                            <div className="mb-3 mt-5">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name='name' id="name" onInput={(e) => setTitle(e.target.value)} value={title} placeholder="Nama Product"></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Image</label>
                                <input className="form-control" name='image' type="file" id="formFile" onChange={(e) => ValindasiAndPreview(e)}></input>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <img src={preview} width="200" className='mt-3' alt={preview} id='preview' />
                            </div>
                            <div className="d-flex justify-content-center mt-4" >
                                <button className='btn btn-success shadow px-5' >Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBarang
