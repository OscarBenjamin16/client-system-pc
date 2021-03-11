import React from "react";

const NewProducts = () => {
  return (
    <div className="mt-96 ml-2 shadow section-new" style={{ width: "95%" }}>
      <span className="bg-blue-500 text-white p-3 mb-4 text-center">Nuevos Productos</span>
      <div className="grid mt-5 sm:mt-4 md:mt-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 lg:gap-2">
        <div
          style={{ width: "350px" }}
          className="flex-1 sm:m-4 h-56 sm:flex-auto sm:flex-grow md:flex-grow-0 flex flex-row shadow rounded hover:shadow-md"
        >
          <div className="w-6/12">
            <div
              className="w-full h-full flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
              style={{
                backgroundImage: "url('https://unsplash.it/804/800')",
              }}
            ></div>
          </div>
          <div className="w-6/12 p-4 flex flex-col">
            <span className="text-xs font-bold text-center">
              LAPTOP HP PROBOOK 6470b
            </span>
            <span className="text-xs font-semibold">8GB RAM</span>
            <span className="text-xs font-semibold mt-1">290GB DISCO DURO</span>
            <span className="text-xs font-semibold mt-1">Windows 10</span>
            <span className="text-xs font-semibold mt-1">
              *Incluye audifonos*
            </span>
            <span className="bg-green-500 w-10 rounded text-xs p-1 font-bold text-white mt-2">
              $300
            </span>
            <button className="bg-blue-400 text-white font-bold text-xs rounded p-1 mt-4">
              Agregar al carrito
            </button>
          </div>
        </div>
        <div
          style={{ width: "350px" }}
          className="flex-1 mt-5 sm:mt-4 md:mt-3 sm:m-4 h-56 sm:flex-auto sm:flex-grow md:flex-grow-0 flex flex-row shadow rounded hover:shadow-md"
        >
          <div className="w-6/12">
            <div
              className="w-full h-full flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
              style={{
                backgroundImage: "url('https://unsplash.it/804/800')",
              }}
            ></div>
          </div>
          <div className="w-6/12 p-4 flex flex-col">
            <span className="text-xs font-bold text-center">
              LAPTOP HP PROBOOK 6470b
            </span>
            <span className="text-xs font-semibold">8GB RAM</span>
            <span className="text-xs font-semibold mt-1">290GB DISCO DURO</span>
            <span className="text-xs font-semibold mt-1">Windows 10</span>
            <span className="text-xs font-semibold mt-1">
              *Incluye audifonos*
            </span>
            <span className="bg-green-500 w-10 rounded text-xs p-1 font-bold text-white mt-2">
              $300
            </span>
            <button className="bg-blue-400 text-white font-bold text-xs rounded p-1 mt-4">
              Agregar al carrito
            </button>
          </div>
        </div>
        <div
          style={{ width: "350px" }}
          className="flex-1 mt-5 sm:mt-4 md:mt-3 sm:m-4 h-56 sm:flex-auto sm:flex-grow md:flex-grow-0 flex flex-row shadow rounded hover:shadow-md"
        >
          <div className="w-6/12">
            <div
              className="w-full h-full flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
              style={{
                backgroundImage: "url('https://unsplash.it/804/800')",
              }}
            ></div>
          </div>
          <div className="w-6/12 p-4 flex flex-col">
            <span className="text-xs font-bold text-center">
              LAPTOP HP PROBOOK 6470b
            </span>
            <span className="text-xs font-semibold">8GB RAM</span>
            <span className="text-xs font-semibold mt-1">290GB DISCO DURO</span>
            <span className="text-xs font-semibold mt-1">Windows 10</span>
            <span className="text-xs font-semibold mt-1">
              *Incluye audifonos*
            </span>
            <span className="bg-green-500 w-10 rounded text-xs p-1 font-bold text-white mt-2">
              $300
            </span>
            <button className="bg-blue-400 text-white font-bold text-xs rounded p-1 mt-4">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
