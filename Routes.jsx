import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword1 from "../auth/ForgetPassword1";
import UserLayout from "../components/user/UserLayout";
import UserAccount from "../components/user/UserAccount";
import UpdatePicture from "../components/user/UpdatePicture";
import UpdateProfile from "../components/user/UpdateProfile";
import UpdatePassword from "../components/user/UpdatePassword";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import AddAlbum from "../components/admin/AddAlbum";
import DeleteUser from "../components/user/DeleteUser";
import Dashboard from "../components/home/Dashboard";
import AlbumDetails from "../components/home/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

const routes=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
                children:[
                    {
                        index:true,
                        element:<Dashboard/>
                    },
                    {
                        path:"album-details",
                        element:<AlbumDetails/>
                    }
                ]
            },
            {
                path:"auth/login",
                element:<PublicRoutes><Login/></PublicRoutes>
            },
            {
                path:"auth/register",
                element:<PublicRoutes><Register/></PublicRoutes>
            },
          {
            path:"auth/forgetpassword1",
            element:<PublicRoutes><ForgotPassword1/></PublicRoutes>
          },
          {
             path:"admin",
             element:<ProtectedRoutes><AdminRoutes><AdminLayout/></AdminRoutes></ProtectedRoutes>,
             children:[
                {
                    index:true,
                    element:<ProtectedRoutes><AdminRoutes><AdminDashboard/></AdminRoutes></ProtectedRoutes>
                },
                {
                    path:"add-album",
                    element:<ProtectedRoutes><AdminRoutes><AddAlbum/></AdminRoutes></ProtectedRoutes>
                },
               
             ]
          },
          {
            path:"user-profile",
            element:(<ProtectedRoutes><UserLayout/></ProtectedRoutes>),
            children:[
                {
                    index:true,
                    element:<ProtectedRoutes><UserAccount/></ProtectedRoutes>
                },
                {
                    path:"user-picture",
                    element:<ProtectedRoutes><UpdatePicture/></ProtectedRoutes>
                },
                {
                    path:"user-profile",
                    element:<ProtectedRoutes><UpdateProfile/></ProtectedRoutes>
                },
                {
                    path:"user-password",
                    element:<ProtectedRoutes><UpdatePassword/></ProtectedRoutes>
                },
                {
                    path:"delete-user",
                    element:<ProtectedRoutes><DeleteUser/></ProtectedRoutes>
                },
               
            ]
          }
        ]
    }
])

export default routes