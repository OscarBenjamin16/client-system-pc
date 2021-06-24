import React, { ReactNode, SetStateAction } from "react";
import { Dispatch } from "react";
import NavBar from "./NavBar";

type Props = {
  children?: ReactNode;
  title?: string;
  authData?:{} | undefined;
  reload?:boolean,
  setReload?:Dispatch<SetStateAction<boolean>>
};
const Layout = ({ children,reload,setReload }: Props) => {
  return (
    <div>
      <NavBar setReload={setReload} reload={reload}/>
      <header className="bg-white">
        <div className="w-screen h-full mt-10 sm:mt-20">{children}</div>
      </header>
      <footer className="py-1 z-50 sm:py-3 font-small sm:text-md fixed w-full xs:mb-0 bottom-0 bg-gray-800 text-white text-center">
        © Copyright - SystemPC 2021
      </footer>
    </div>
  );
};

export default Layout;
