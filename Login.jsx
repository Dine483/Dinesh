import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { __AUTH } from '../backend/FirebaseConfig';
import Spinner from '../helpers/Spinner';
import NavbarContainer from '../components/navbar/NavbarContainer';
import { AuthContextAPI } from '../context/AuthContext';

const Login = () => {
  let[isLoading,setIsLoading]=useState(false)
  let[togglePassword,setTogglePassword]=useState(false)
  let [data,setData]=useState({
    email:"",
    password:""
  })

  let{email,password}=data;
  let navigate=useNavigate()
 let {setAuthUser}= useContext(AuthContextAPI)

  let handleChange=(e)=>{
    let value=e.target.value  
    let key=e.target.name 
    setData({...data,[key]:value})
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      let obj=await signInWithEmailAndPassword(__AUTH,email,password)
      // console.log(obj);
      let {user}=obj
      console.log(user);
      if(user.emailVerified == true){
        toast.success("Login Successful")
        setAuthUser(user)
        navigate("/")
      }
      else{
        toast.error("Verify your email")
        sendEmailVerification(user)
      }
      
      
    } catch (error) {
      toast.error(error.message.slice(22,error.message.length-2))

    }
    finally{
      setIsLoading(false)
      }
    
  }
  return (
   <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center '>
           <div className='w-[30%] bg-slate-700 p-4'>
             <h1 className='text-center text-3xl text-purple-600 font-medium'>Login</h1>
             <main className='p-2'>
               <form className='flex flex-col gap-2'onSubmit={handleSubmit}>
                   
                   <div>
                   <label htmlFor="email" className='block'>Email</label>
                   <input type="email" id="email" placeholder="Enter email"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' onChange={handleChange} name="email" value={email} />
                   </div>
                   <div className='relative'>
                   <label htmlFor="password" className='block'>Password</label>
                   <input type={togglePassword? "text":"password"} id="password" placeholder="Enter password"className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2' onChange={handleChange} name="password" value={password} />
                   {togglePassword?(<FaEye className='absolute top-9 right-3 cursor pointer' onClick={()=>setTogglePassword(!togglePassword) }/>):(<FaEyeSlash className='absolute top-9 right-3 cursor pointer' onClick={()=>setTogglePassword(!togglePassword) } />)}
   
                   </div>
                 
                   
                  <div>
                  <button type="submit" className='outline-none  w-[100%] py-1 my-2 rounded-md pl-2 cursor-pointer bg-blue-600 hover:bg-blue-800 font-semibold' >Login</button>
                  </div>
                  <div className='flex justify-center gap-1'>
                       <span>Don't have an account? </span>
                       <NavLink to="/auth/register"className="text-red-500" ><button className="hover:cursor-pointer">Register</button></NavLink>
                   </div>
                   <div className='flex justify-center gap-1'>
                       
                       <NavLink to="/auth/forgetpassword1"className="" ><button className="hover:cursor-pointer">Forget Password?</button></NavLink>
                   </div>
               </form>
             </main>
           </div>
           {isLoading && <Spinner/>}
       </section>
  )
}

export default Login