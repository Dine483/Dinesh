import React,{ useContext } from 'react'
import { UserContextAPI } from '../context/UserContext'

const AdminRoutes = (props) => {
    let {userProfile}=useContext(UserContextAPI)
    
        if (userProfile.role==="admin") {
            return props.children;
         
        }else{
            return <Navigate to="/auth/login"/>
        }
}

export default AdminRoutes