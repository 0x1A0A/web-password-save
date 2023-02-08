import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Login, Home} from "./component";


export default function App() {
  const token = localStorage.getItem("passman-jwt-auth");

  if (!token) return <Login></Login>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
  ]);
  
  return (<RouterProvider router={router}></RouterProvider>);
}
