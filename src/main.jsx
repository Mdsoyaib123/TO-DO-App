import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Page/Home";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import TaskEdit from "./Page/TaskEdit";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/taskEdit/:id',
        element:<TaskEdit></TaskEdit>,
        loader: ({params})=>fetch(`http://localhost:5000/taskById/${params.id}`)
        
      }
      
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster></Toaster>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
