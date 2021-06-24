import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function index() {
  return (
    <div className="p-10 w-screen flex h-screen bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="w-8/12 flex flex-col justify-center items-center content-center">
        <p className="text-8xl font-semibold text-white overflow-hidden">404</p>
        <span className="text-white font-medium text-md mt-2">Not Found</span>
        <p className="text-left font-light text-white mt-4">
          La pagina a la que intentaste acceder no fue encontrada revisa la url
          e intenta de nuevo
        </p>
        <ul className="mt-4">
          <Link href="/">
            <li className="font-light text-white cursor-pointer">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="ml-3">Ir al inicio</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="float-right">
        <div className="flex p-10">
          <div className="w-24 h-24 border-2 border-blue-600 border-solid transform rotate-45"></div>
          <div className=" w-16 h-16 border-2 border-red-600 border-solid transform rotate-45 ml-10"></div>
        </div>
        <div className="flex p-10">
          <div className="w-10 h-10 border-2 border-green-600 border-solid transform rotate-45"></div>
          <div className=" w-20 h-20 border-2 border-yellow-600 border-solid transform rotate-45 ml-10"></div>
        </div>
      </div>
    </div>
  );
}
