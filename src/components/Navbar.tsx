import { MdHome, MdOutlineCatchingPokemon } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import pokeball from "/pokeball.png";

import { Link, useNavigate } from "react-router-dom";
import { FC, useContext } from "react";
import { ThemeContexat } from "@/utils/context";

const Navbar: FC = () => {
  const { theme, setTheme } = useContext(ThemeContexat);
  const navigate = useNavigate();

  function handleTheme(mode: string) {
    setTheme(mode);
  }

  return (
    <nav className="bg-slate-200 w-full h-16 flex items-center py-3 px-12 justify-between dark:bg-slate-700 sticky top-0">
      <div className="w-8 h-8"></div>
      <Link to="/" id="nav-homepage">
        <img src={pokeball} className="logo h-10" alt="Pokeball logo" />
      </Link>
      <div className="flex items-center gap-4">
        <Switch
          onChange={() => handleTheme(theme === "dark" ? "light" : "dark")}
          className={`${
            theme === "dark" ? "bg-slate-800 " : "bg-slate-300"
          } flex h-8 w-8 items-center justify-center rounded-full`}
        >
          {theme === "dark" ? (
            <FaMoon className="h-5 w-5 rounded-full" color="white" />
          ) : (
            <FaSun className="h-5 w-5 rounded-full" color="#1e293b" />
          )}
        </Switch>
      </div>
    </nav>
  );
};

export default Navbar;
