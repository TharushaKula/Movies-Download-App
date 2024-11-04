import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import HomePage from "./pages/home/home.page.jsx";
import RootLayout from "./layouts/root.layout.jsx";
import SingleMoviePage from "./pages/single-movie/single-movie.page.jsx";
import BrowsePage from "./pages/browse/browse.page.jsx";
import CustomMovieWidgets from "./pages/pagetest/test.page.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies",
        element: <SingleMoviePage />,
      },
      {
        path: "/browse",
        element: <BrowsePage />,
      },
      {
        path: "/test",
        element: <CustomMovieWidgets />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
