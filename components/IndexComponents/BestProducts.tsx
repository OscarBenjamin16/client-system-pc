import React from "react";
import { PRating } from "../../interfaces/product";
import { showImage } from "../../services/catalog.service";
import { io } from "socket.io-client";

interface Props {
  products: PRating[];
}

const BestProducts = ({ products }: Props) => {
  const socket = io("http://localhost:5000");
  const newOrder = ()=>{
    socket.on("connect", () => {});
    socket.emit("new","new order is added")
  }
  return (
    <div className="mt-4 ml-2 shadow section-new" style={{ width: "95%" }}>
      <span className="bg-blue-500 text-white p-3 mb-4 text-center">
        Mejor Calificados
      </span>
      <div className="grid mt-5 sm:mt-4 md:mt-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 lg:gap-2">
        {products.map((prod, _) => (
          <div
            style={{ width: "350px" }}
            className="flex-1 sm:m-4 h-56 sm:flex-auto sm:flex-grow md:flex-grow-0 flex flex-row shadow rounded hover:shadow-md"
          >
            <div className="w-6/12">
              <div
                className="w-full h-full flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
                style={{
                  backgroundImage: `url("${showImage(prod.image)}")`,
                }}
              ></div>
            </div>
            <div className="w-6/12 p-4 flex flex-col">
              <span className="text-xs font-bold text-center">
                {prod.nombreProducto}
              </span>
              <span className="text-xs font-semibold mt-2">
                {prod.marca.marca}
              </span>
              <span className="text-xs font-semibold mt-2">
                {prod.categoria.categoria}
              </span>
              <span className="text-xs font-semibold mt-2">⭐⭐⭐</span>
              <span className="bg-green-500 w-11 text-xs rounded md:text-xs p-1 font-medium overflow-hidden text-white mt-2">
                ${prod.costo_standar}
              </span>
              <button
                onClick={newOrder}
                className="bg-blue-400 text-white font-bold text-xs rounded p-1 mt-4"
              >
                Ver Mas...
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
