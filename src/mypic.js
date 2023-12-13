import React, { useState , useEffect } from 'react';
import axios from 'axios';

const Mypic = () => {
    const [newUser, setNewUser] = useState(
        {
            name: '',
            birthdate: '',
            photo: '',
        }
    );
    
    let setNewAuthor = setNewUser;
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('birthdate', newUser.birthdate);
        formData.append('name', newUser.name);

        axios.post('http://localhost:1111/imagelist', formData)
             .then(res => {
                alert("Record Save Successfully..")
                getphoto();
             })
             .catch(err => {
                console.log(err);
             });
    }

    const handleChange = (e) => {
        setNewAuthor({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewAuthor({...newUser, photo: e.target.files[0]});
    }

    let[allphoto, updatePhoto] = useState( [] );
    const getphoto = () =>{
        fetch("http://localhost:1111/imagelist")
        .then(response=>response.json())
        .then(photoArray=>{
            updatePhoto(photoArray);
        })
    }

    useEffect(()=>{
        getphoto();
    },[1]);


    return (
        <div className='container mt-5'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="text"
                placeholder="name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
            />

            <input 
                type="date"
                name="birthdate"
                value={newUser.date}
                onChange={handleChange}
            />

            <input 
                type="submit"
            />
        </form>
            <div className='row mt-5'>
                {
                    allphoto.map((myphoto, index)=>{
                        return(
                            <div className='col-lg-3 mb-4' key={index}>
                                <h4> {myphoto.name} </h4>
                                <img src={`http://127.0.0.1:5500/BackEnd/rest-api/images/${myphoto.photo}`} height="150" width="150"/>
                                <p> Date of Borth : {myphoto.birthdate} </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Mypic;