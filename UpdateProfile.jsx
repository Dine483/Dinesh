import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { __DB } from '../../backend/FirebaseConfig'
import { doc,setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast' 
import { UserContextAPI } from '../../context/UserContext'
import Spinner from '../../helpers/Spinner'

const UpdateProfile = () => {
  let[isLoading,setIsLoading]=useState(false)
  let {authUser}=useContext(AuthContextAPI)
  let {userProfile}=useContext(UserContextAPI)
  let [data,setData]=useState({
    phoneNo:userProfile?.phoneNumber,
    dob:userProfile?.dateOfBirth,
    languages:userProfile?.languages,
    gender:userProfile?.gender,
    address:userProfile?.address
  })
  let {phoneNo,dob,languages,gender,address}=data
  let handleChange=(e)=>{
    let key=e.target.name 
    let value=e.target.value 
    setData({...data,[key]:value})
  }

  let handleSubmit=async (e)=>{
    e.preventDefault()
    let {displayName,email,photoURL,uid}=authUser
    let payload={
       name:displayName,
       email:email,
       photo:photoURL,
       id:uid,
       phoneNumber:phoneNo,
       dateOfBirth:dob,
       gender:gender,
       languages:languages,
       address:address,
       role:"user"
    }
    try {
      setIsLoading(true)
      console.log(payload);
      

      let user_collection=doc(__DB,"user_profile",uid)
      await setDoc(user_collection,payload)
      toast.success("Details added")
      // let user_collection=doc(__DB,"user_profile",uid)
      // await setDoc(user_collection,payload)
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
      }
    
  }
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center'>
      <article className='min-h-[500px] w-[60%] bg-slate-900 rounded-xl p-4'>
        <h2 className='text-center text-2xl'>Upload Profile Data</h2>


        <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>
          <article className='flex gap-5 ' >
            <div className='flex gap-2 flex-col w-[48%]'>
              <label htmlFor="phoneNo" className='block text-[18px] '>Phone Number</label>
              <input type="tel" id="phoneNo" placeholder='Enter phone number' className='outline-none bg-white py-2 px-4 rounded-lg text-black' onChange={handleChange}  name="phoneNo" value={phoneNo}/>
            </div>
            <div className='flex gap-2 flex-col  w-[48%]'>
              <label htmlFor="dob" className='block text-[18px] '>Date of birth</label>
              <input type="date" id="dob" placeholder='Enter Date of birth' className='outline-none bg-white py-2 px-4 rounded-lg text-black' onChange={handleChange}  name="dob" value={dob}/>
            </div>
          </article>



          <article className='flex gap-5 ' >
            <div className='flex gap-2 flex-col w-[48%]'>
              <label htmlFor="languages" className='block text-[18px] '>Languages</label>
              <input type="text" id="languages" placeholder='Enter languages' className='outline-none bg-white py-2 px-4 rounded-lg text-black' onChange={handleChange}  name="languages" value={languages}/>
            </div>
            <div className='flex gap-2 flex-col  w-[48%]'>
              <label htmlFor="gender" className='block text-[18px] '>Gender</label>
              <div className='font-semibold  text-lg flex  gap-2'>
                <input type="radio" onChange={handleChange}   name="gender" value="Male" checked={gender==="Male"} /><span>Male</span>
                <input type="radio" onChange={handleChange} name="gender" value="Female" checked={gender==="Female"}/><span>Female</span>
                <input type="radio" onChange={handleChange} name="gender" value="Others" checked={gender==="Others"} /><span>Others</span>
              </div>
            </div>
          </article>


          <article className='flex gap-5 ' >
            <div className='flex gap-2 flex-col w-[100%]'>
              <label htmlFor="address" className='block text-[18px] '>Address</label>
              <textarea  id="address" placeholder="Enter your Address " className='outline-none bg-white py-2 px-4 rounded-lg text-black' onChange={handleChange} name="address" value={address}></textarea>
            </div>
          </article>

          <article >
              <button type='submit' className='py-2 bg-blue-600 w-[100%] rounded-lg text-lg hover:bg-blue-800 text-center cursor-pointer'>Submit</button>
          </article>
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile