import React, { useState } from "react"; // Import useState from React
import "./App.css";
import Navbar from "./components/shared/Navbar.Jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";

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
    path:"/Jobs",
    element:<Jobs/>
  }
  
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
