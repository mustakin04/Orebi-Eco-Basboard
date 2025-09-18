import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import CreateCategory from "./component/CreateCategory";
import CategoryList from "./component/CategoryList";
import Product from "./component/product";
function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      // { index: true, Component: Home },
      { path: "/", Component: CreateCategory },
      {path:"/categoryList",Component:CategoryList},
      {path:"/product",Component:Product}
    ],
  },
]);
  return (
    <>
      <RouterProvider router={router}/>,
    </>
  );
}

export default App;
