import React from 'react'
import { useState, useEffect } from 'react';

const Mylogin = () => {
    let [ emailid , pickemailid ] = useState("");
    let [ password , pickpassword ] = useState("");
    let [ message , updatemessage ] = useState(" Enter Your Login Details");

    const login = () =>{
        if( emailid == "" || password == "" ){
            updatemessage(" Enter Email of Password ");
        }
        else{
            updatemessage("Please wait Validation ");
            let url = "http://localhost:1111/auth";
            let input = { 
                "emailid" : emailid,
                "password" : password
            }
            let postdsta = {
                headers : {'Content-Type' : 'application/json'},
                method : "POST",
                body : JSON.stringify(input)
            }

            fetch(url, postdsta)
            .then(response=>response.json())
            .then(userArray=>{
                if(userArray.length == 0 ){
                    updatemessage("Invalid or Not Exist ! ");
                }
                else{
                    updatemessage(" Success : Redirecting... ");
                    localStorage.setItem("usertoken", userArray[0]._id);
                    localStorage.setItem("fullname", userArray[0].fullname);
                    window.location.reload();
                }
            })
        }
    }
    
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-lg-4'></div>
            <div className='col-lg-4'>
                <div className='p-4 rounded shadow-lg'>
                    <h3 className='text-center text-danger mb-4'> Admin Login </h3>
                    <p className='text-center text-danger'>{message}</p>
                    <div className='mb-3'>
                        <strong> Email ID </strong>
                        <input type='email' className='form-control mt-2' placeholder='Enter Email ID'
                        onChange={suraj=>pickemailid(suraj.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <strong> Password </strong>
                        <input type='password' className='form-control mt-2' placeholder='Enter Password'
                        onChange={suraj=>pickpassword(suraj.target.value)}/>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-danger'
                        onClick={login}> Login </button>
                    </div>
                </div>
            </div>
            <div className='col-lg-4'></div>
        </div>
    </div>
  )
}

export default Mylogin;
