import { useState , useEffect } from 'react';
import React from 'react'
import axios from 'axios';

const Updateimage = () => {

    let [ allproduct , updateProduct ] = useState([]);
    const getitem = () =>{
        fetch("http://localhost:1111/itemlist")
        .then(response=>response.json())
        .then(itemArray=>{
            updateProduct(itemArray.reverse());
        })
    }
    useEffect(()=>{
        getitem()
    },[1]);

    let [ productid , updateid ] = useState("");
    let [ newpic , updatepic ] = useState("");
 
    const handlePhoto = (e) => {
        updatepic(e.target.files[0]);
    }

    const save = (obj) =>{
        obj.preventDefault();   // to prevent from page Load
        // console.log(productid);
        // console.log(newpic);

        const formData = new FormData();
        formData.append('photo', newpic);
        formData.append('id', productid);

        axios.put('http://localhost:1111/imagelist', formData)
             .then(res => {
                alert("Images Uploaded Successfully..");
             })
             .catch(err => {
                console.log(err);
             });
    }

  return (
    <section className='container mt-5'>
       <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4'>
            <h3 className='text-center'> Update Product Images</h3>
            <form onSubmit={save} encType='multipart/form-data'>
                <div className='mb-4'>
                    <label> Product </label>
                    <select className='form-select'
                    onChange={suraj=>updateid(suraj.target.value)}>
                        <option>Choose</option>
                        {
                            allproduct.map((product, index)=>{
                                return(
                                    <option key={index} value={product._id}> { product.itemname} </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='mb-4'>
                    <label> Choose Photo </label>
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto}
                    />
                </div>
                <div className='text-center'>
                    <button className='btn btn-primary m-2' type='submit'> Update Photo</button>
                </div>
            </form>

        </div>
        <div className='col-lg-4'></div>
       </div>
    </section>
  )
}

export default Updateimage;
