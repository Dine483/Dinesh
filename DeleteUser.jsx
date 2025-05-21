import { deleteUser } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContextAPI } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { __DB } from '../../backend/FirebaseConfig'
import Spinner from '../../helpers/Spinner'

const DeleteUser = () => {
     let[isLoading,setIsLoading]=useState(false)
    let[text,setText]=useState("")
    let {authUser}=useContext(AuthContextAPI)
    let navigate=useNavigate()

    let handleChange=(e)=>{
        setText(e.target.value)
    }

    let handleSubmit=async (e)=>{
        e.preventDefault()
        try {
            setIsLoading(true)
            if (text.toLowerCase().trim()=== "delete account") {
                let user_collection=doc(__DB,"user_profile",authUser?.uid)
                await deleteUser(authUser)
                 await deleteDoc(user_collection)
                toast.success("Account Deleted successfully")
                navigate("/auth/register")
            }else{

            }
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setIsLoading(false);
          }
    }
  return (
   <section className='h-[100%] w-[100%] flex items-center justify-center'>
    <article className='min-h-[500px] w-[50%] bg-slate-900 rounded-xl p-4'>
    <h2 className='text-center text-2xl'>Delete Account</h2>
    <form className='mt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
            <h3>Are you sure you want to delete the account ?</h3>
            <h3>If yes, Enter delete account</h3>
        </div>
        <input type="text" placeholder='Delete Account' className='outline-none w-full bg-white py-2 px-4 rounded-lg text-black'value={text} onChange={handleChange} />
        <button className='py-2 bg-red-600 w-[100%] rounded-lg  hover:bg-red-800 text-center cursor-pointer'>Delete account</button>
    </form>
    </article>
    {isLoading && <Spinner />}
   </section>
  )
}

export default DeleteUser