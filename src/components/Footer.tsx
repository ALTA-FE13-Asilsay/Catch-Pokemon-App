import { MdHome, MdOutlineCatchingPokemon } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import pokeball from "/pokeball.png";

import { Link, useNavigate } from "react-router-dom";
import { FC, useContext } from "react";
import { ThemeContexat } from "@/utils/context";

const Footer: FC = () => {
  const { theme, setTheme } = useContext(ThemeContexat);
  const navigate = useNavigate();

  function handleTheme(mode: string) {
    setTheme(mode);
  }

  return (
    <nav className="bg-slate-200 w-full h-16 flex items-center py-3 px-12 justify-between dark:bg-slate-700 sticky bottom-0">
      <Link to="/" className="h-auto flex flex-col items-center">
        <MdHome
          color={`${theme === "dark" ? "#e2e8f0" : "#1e293b"}`}
          size="1.5rem"
        />
        <p className="text-slate-800 tracking-wider text-xs dark:text-slate-200">
          HOME
        </p>
      </Link>
      <Link to="/MyPoke" className="h-auto flex flex-col items-center">
        <MdOutlineCatchingPokemon
          color={`${theme === "dark" ? "#e2e8f0" : "#1e293b"}`}
          size="1.5rem"
        />
        <p className="text-slate-800 tracking-wider text-xs dark:text-slate-200">
          MYPOKEMON
        </p>
      </Link>
    </nav>
  );
};

export default Footer;
