import React, { useState } from "react"; // Import useState from React
import "./App.css";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import Companies from "./components/Admin/Companies";
import CompanyCreate from "./components/Admin/CompanyCreate";
import CompanySetup from "./components/Admin/CompanySetup";
import AdminJobs from "./components/Admin/AdminJobs";
import PostJob from "./components/Admin/PostJob";
import Applicants from "./components/Admin/Applicants";
import OtpAuth from "./components/auth/OtpAuth";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"OtpAuth",
    element:<OtpAuth/>
  },
  {
    path:"/Jobs",
    element:<Jobs/>
  },
  {
    path:"/Browse",
    element:<Browse/>
  },
  {
    path:"/Profile",
    element:<Profile/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  
]);

function App() {
  const [count, setCount] = useState(0); // Initialize the count state

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
