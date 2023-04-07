import { FC, ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="flex justify-center bg-slate-900">
      <div className="min-w-full max-w-full bg-white dark:bg-neutral-800 md:min-w-[480px] md:max-w-[480px] h-screen flex flex-col bg-gradient-to-r from-[#1488CC] to-[#2B32B2] dark:from-[#0f0c29] dark:to-[#302b63]">
        <Navbar />
        <div className="h-full w-full py-3 px-3 overflow-auto">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
