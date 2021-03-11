import React, { ReactNode } from "react";
import NavBar from "./NavBar";

type Props = {
  children?: ReactNode;
  title?: string;
  authData?:{} | undefined
};
const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavBar/>
      <header className="bg-white">
        <div className="w-screen h-full">{children}</div>
      </header>
      <footer className="h-10 fixed w-full xs:mb-0 bottom-0 bg-gray-800 text-white text-center">
        © Copyright - SystemPC 2021
      </footer>
    </div>
  );
};

export default Layout;
