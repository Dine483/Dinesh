import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

import { NavLink, useNavigate } from 'react-router-dom'
import { __AUTH } from '../backend/FirebaseConfig';
import Spinner from '../helpers/Spinner';

const Register = () => {
  let navigate=useNavigate() 
  let[isLoading,setIsLoading]=useState(false)
  let[togglePassword,setTogglePassword]=useState(false)
  let[toggleConfirmPassword,setToggleConfirmPassword]=useState(false)
  let[data,setData]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  })
  let{username,email,password,confirmpassword}=data;

  let handleChange=(e)=>{
    let value=e.target.value  
    let key=e.target.name 
    setData({...data,[key]:value})
  }

  let handleSubmit=async (e)=>{
    e.preventDefault()
   try {
    setIsLoading(true)
    if(password !==confirmpassword){
      
       toast.error("Confirm Password Does Not Match")
       setData({...data,confirmpassword:""})
    }else{
     let obj=await createUserWithEmailAndPassword(__AUTH,email,password)
     let {user}=obj
     console.log(user);
     await updateProfile(user,{
      displayName:username,
      photoURL:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
     })
     sendEmailVerification(user)
     toast("Verification link sent")
     toast.success("User registered")
     navigate("/auth/login")
    }
   } catch (error) {
    console.log(error.message);
    toast.error(error.message.slice(22,error.message.length-2))
   }
    finally{
    setIsLoading(false)
    }
    
  }
    return (
    <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center '>
        <div className='w-[30%] bg-slate-700 p-4'>
          <h1 className='text-center text-3xl text-purple-600 font-medium'>Register</h1>
          <main className='p-2'>
            <form className='flex flex-col gap-2'onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username" className='block'>Username</label>
                <input type="text" id="username" placeholder="Enter username"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'  onChange={handleChange} name="username" value={username}/>
                </div>
                <div>
                <label htmlFor="email" className='block'>Email</label>
                <input type="email" id="email" placeholder="Enter email"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' onChange={handleChange} name="email" value={email} />
                </div>
                <div className='relative'>
                <label htmlFor="password" className='block'>Password</label>
                <input type={togglePassword? "text":"password"} id="password" placeholder="Enter password"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' onChange={handleChange} name="password" value={password} />
                {togglePassword?(<FaEye className='absolute top-9 right-3 cursor pointer' onClick={()=>setTogglePassword(!togglePassword) }/>):(<FaEyeSlash className='absolute top-9 right-3 cursor pointer' onClick={()=>setTogglePassword(!togglePassword) } />)}

                </div>
                <div className='relative'>
                <label htmlFor="confirmpassword" className='block'>Confirm Password</label>
                <input type={toggleConfirmPassword? "text":"password"}  id="confirmpassword" placeholder="Confirm password"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' onChange={handleChange} name="confirmpassword" value={confirmpassword} />
                {toggleConfirmPassword?(<FaEye className='absolute top-9 right-3 cursor pointer' onClick={()=>setToggleConfirmPassword(!toggleConfirmPassword) }/>):(<FaEyeSlash className='absolute top-9 right-3 cursor pointer' onClick={()=>setToggleConfirmPassword(!toggleConfirmPassword) } />)}
                </div>
                
               <div>
                <button type="submit" className='outline-none  w-[100%] py-1 my-2 rounded-md pl-2 cursor-pointer bg-blue-600 hover:bg-blue-800 font-semibold' >Submit</button>
               </div>
               <div className='flex justify-center gap-1'>
                       <span>Already have an account? </span>
                       <NavLink to="/auth/login"className="text-red-500" ><button className="hover:cursor-pointer">login</button></NavLink>
                   </div>
            </form>
          </main>
        </div>
        {isLoading && <Spinner/>}
    </section>
  )
}

export default Register