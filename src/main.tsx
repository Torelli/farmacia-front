import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./components/root/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Categories, { loader as categoryLoader } from "./pages/Categories";
import { action as categoryAction } from "./components/forms/CategoryForm";
import CategoryContainer, {
  action as categoryContainerAction,
  loader as categoryContainerLoader,
} from "./pages/CategoryContainer";
import { action as destroyAction } from "./components/destroy/Destroy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/categorias",
        element: <Categories />,
        loader: categoryLoader,
        action: categoryAction,
      },
      {
        path: "/categorias/:id",
        element: <CategoryContainer />,
        loader: categoryContainerLoader,
        action: categoryContainerAction,
      },
      {
        path: "/categorias/:id/destroy",
        action: destroyAction
      },
      {
        path: "/produtos",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
