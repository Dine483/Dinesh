import React from 'react'
import UserSidebar from './UserSidebar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
  <div className='flex bg-slate-800 h-[calc(100vh-70px)] gap-2'> <UserSidebar/>
   <Outlet/></div>
  )
}

export default UserLayout