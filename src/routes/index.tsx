import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import axios from "axios";

import NotFound from "@/pages/NotFound";
import Detailed from "@/pages/Detailed";
import MyPoke from "@/pages/MyPoke";
import Home from "@/pages";

import { ThemeContexat } from "@/utils/context";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/detailed/:name",
      element: <Detailed />,
      errorElement: <NotFound />,
    },
    {
      path: "/MyPoke",
      element: <MyPoke />,
      errorElement: <NotFound />,
    },
  ]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContexat.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContexat.Provider>
  );
};

export default Router;
