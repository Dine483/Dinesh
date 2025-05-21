import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { IoMdAlbums } from "react-icons/io";


const AdminSidebar = () => {
  return (
    <div className='h-[calc(100vh-70px)] sticky top-[70px]  w-[20%] bg-slate-600 px-4 py-8 shrink-0'>
    <ul className='flex flex-col gap-3'>
        <li>
            <NavLink to="/admin" end className={(obj)=>{
            let {isActive}=obj
            return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600 "}`;
            
            }}><span><MdDashboard />
</span><span>Admin Dashboard</span></NavLink>
        </li>
        <li>
            <NavLink to="/admin/add-album" className={(obj)=>{
            let {isActive}=obj
            return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600"}`;
            
            }}><span><IoMdAlbums /></span><span>Add Album</span></NavLink>
        </li>



        {/* <li>
            <NavLink to="/user-profile/user-profile" className={(obj)=>{
            let {isActive}=obj
            return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600"}`;
            
            }}></NavLink>
        </li>
        <li>
            <NavLink to="/user-profile/user-password" className={(obj)=>{
            let {isActive}=obj
            return `py-2 w-[100%]  hover:bg-blue-800 px-4 rounded-lg  cursor-pointer text-lg font-semibold flex items-center gap-2 ${isActive && "bg-blue-600"}`;
            
            }}></NavLink>
        </li> */}
       
    </ul>
</div>
)
}

export default AdminSidebar