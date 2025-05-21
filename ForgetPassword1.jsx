import React, { useState } from 'react'
import Spinner from '../helpers/Spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { sendPasswordResetEmail } from 'firebase/auth'
import { __AUTH } from '../backend/FirebaseConfig'

const ForgotPassword = () => {
    let [email,setEmail]=useState("")
    let [isLoading,setisLoading]=useState(false)
    let navigate=useNavigate()
    
    const handlechange=(e)=>{
        setEmail(e.target.value)
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            setisLoading(true);
            await sendPasswordResetEmail(__AUTH,email)
            toast.success("reset link sent to email")
            navigate("/auth/login")
        } catch (error) {
            toast.success(error.message)
            
        }
        finally{
            setisLoading(false)
        }
    }

  return (
    <section className='h-[calc(100vh-70px)] w-[100vw] bg-slate-900 flex justify-center items-center '>
    <div className='bg-slate-700  w-[30%] p-4 rounded-lg'>
      <header>
        <h1 className='text-center text-3xl '>Reset Password</h1>
      </header>
      <main className='p-2'>
        <form action="" className='flex flex-col gap-2' onSubmit={handlesubmit}>
          <div>
           <label htmlFor="email" className='block'>Email</label>
           <input type="email" id='email' placeholder='Enter email' className='outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2'onChange={handlechange} name='email' value={email}/>
          </div>
          <div>
            <button type='submit' className='outline-none  w-[100%] py-1 my-2 rounded-md pl-2 cursor-pointer bg-blue-600 hover:bg-blue-800 font-semibold'>Reset Password</button>
          </div>
          <div className="flex justify-center gap-1">
              <NavLink to="/auth/login" className="bg-red-600  w-[100%] text-center rounded-md font-semibold py-1 hover:bg-red-800">
                <button className=" cursor-pointer "> Cancel</button>
              </NavLink>
          </div>
        </form>
      </main>

    </div>
    {isLoading && <Spinner/>}
  </section>
  )
}

export default ForgotPassword