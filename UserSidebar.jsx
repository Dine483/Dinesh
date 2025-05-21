import React from 'react'
import { MdAccountBox } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom'
import { AiOutlineUserDelete } from "react-icons/ai";




const UserSidebar = () => {
  return (
    <div className='h-[100%] w-[20%] bg-slate-600 px-4 py-8 shrink-0'>
        <ul className='flex flex-col gap-3'>
            <li>
                <NavLink to="/user-profile" end className={(obj)=>{
                let {isActive}=obj
                return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600 "}`;
                
                }}><span ><MdAccountBox /></span><span> My Account</span></NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/user-picture" className={(obj)=>{
                let {isActive}=obj
                return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600"}`;
                
                }}><span><AiFillPicture /></span><span>Update Picture</span></NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/user-profile" className={(obj)=>{
                let {isActive}=obj
                return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600"}`;
                
                }}><span><CgProfile /></span><span>Update Profile</span></NavLink>
            </li>
            <li>
                <NavLink to="/user-profile/user-password" className={(obj)=>{
                let {isActive}=obj
                return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg  cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600"}`;
                
                }}><span><RiLockPasswordFill /></span>Update Password</NavLink>
            </li>


            <li>
                <NavLink to="/user-profile/delete-user" className={(obj)=>{
                let {isActive}=obj
                return `py-2 w-[100%]  hover:bg-red-800 px-4 rounded-lg  cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-red-600"}`;
                
                }}><span><AiOutlineUserDelete /></span>Delete User</NavLink>
            </li>
           
        </ul>
    </div>
  )
}

export default UserSidebar