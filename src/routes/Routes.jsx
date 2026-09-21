import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import CreateComplaint from "../pages/CreateComplaint";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import UserAllComplaints from "../pages/UserAllComplaints";
import ComplaintDetails from './../pages/ComplaintDetails';
import UpdateComplaint from "../pages/UpdateComplaint";
import EditProfile from "../pages/EditProfile";
import PasswordChange from "../pages/PasswordChange";
import AdminProtected from "./AdminProtected";
import AdminLayout from "../layouts/AdminLayout";
import AllComplaints from "../pages/admin/AllComplaints";
import StatusEdit from "../pages/admin/StatusEdit";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: '/signup',
          element: <Signup/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/profile",
          element: <PrivateRoutes>
            <EditProfile/>
          </PrivateRoutes>
        },
        {
          path: "/edit-password",
          element: <PrivateRoutes>
            <PasswordChange/>
          </PrivateRoutes>
        },
        {
          path: "/create-complaint",
          element: <PrivateRoutes>
            <CreateComplaint/>
          </PrivateRoutes>
        },
        {
          path: "/my-complaints",
          element: <PrivateRoutes>
            <UserAllComplaints/>
          </PrivateRoutes>
        },
        {
          path: "/complaints/:id",
          element: <PrivateRoutes>
            <ComplaintDetails/>
          </PrivateRoutes>
        },
        {
          path: "/complaints/edit/:id",
          element: <PrivateRoutes>
            <UpdateComplaint/>
          </PrivateRoutes>
        }
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected>
      <AdminLayout/>
    </AdminProtected>,
    children: [
      {
        path: "all-complaints",
        element: <AllComplaints/>
      },
      {
        path: "edit-status/:id",
        element: <StatusEdit/>
      }
    ]
  }
]);

export default router