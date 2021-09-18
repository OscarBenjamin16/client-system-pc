import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Cart, CatalogProps, Product } from "../../interfaces/product";
import Link from "next/link";
import { setItemCart } from "../../services/cart.service";

function useStickyState(
  value: Product | undefined,
  setLoadCart: Dispatch<SetStateAction<boolean>>,
  setProd: Dispatch<SetStateAction<Product | undefined>>
) {
  if (value) {
    let total =
      Number(value.costo_standar) -
      (Number(value.costo_standar) * Number(value.descuento)) / 100;
    let values: Cart | undefined = {
      id: value.id,
      qt: 1,
      price: total,
      original_price:Number(value.costo_standar)
    };
    setItemCart(values);
    setProd(undefined);
    setLoadCart(true);
  }
}

export default function ProductInfo(props: CatalogProps) {
  const { product, view, setLoadCart } = props;
  const [prod, setProd] = React.useState<Product | undefined>();
  useEffect(() => {
    useStickyState(prod, setLoadCart, setProd);
    return;
  }, [prod]);
  return (
    <div className="flex-1 mt-5 w-full sm:mt-4 md:mt-3 sm:m-4 h-52 sm:h-60 sm:flex-auto sm:flex-grow md:flex-grow-0 flex flex-row shadow rounded hover:shadow-md">
      <div
        className={
          (view ? "w-4/12 lg:w-6/12" : "w-5/12 lg:w-3/12 ") + " cursor-pointer"
        }
      >
        <Link href={`/product/${product.id}`}>
          <div
            className="w-full h-full flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url('${product.image}')`,
            }}
          ></div>
        </Link>
      </div>
      <div className="w-7/12 p-3 flex flex-col">
        <Link href={`/product/${product.id}`}>
          <span className="font-small md:text-sm overflow-hidden font-bold text-center cursor-pointer">
            {product.nombreProducto}
          </span>
        </Link>

        <span className="font-small md:text-sm overflow-hidden font-semibold">
          {product.marca.marca}
        </span>
        <span className="font-small md:text-sm overflow-hidden font-semibold mt-1">
          {product.categoria.categoria}
        </span>
        <div className="mt-2 overflow-hidden">
          <span className="absolute transform -rotate-45 text-white font-bold ml-2 lg:ml-4 z-10 mt-2 lg:mt-3 font-small lg:text-sm">
            {Number(product.descuento)}%
          </span>
          <img
            src="/assets/icons/sale-tag.svg"
            alt="none"
            className="w-8 md:w-10 lg:w-16"
          />
        </div>
        <span className="bg-green-500 w-14 font-small rounded overflow-hidden lg:text-sm p-1 font-bold text-white mt-2">
          ${product.costo_standar}
        </span>
        <div className="grid grid-cols-1 gap-1 mt-4">
          <button
            onClick={() => setProd(product)}
            className="bg-blue-400 text-white font-bold font-small sm:text-xs rounded p-1 mt-4 w-full"
          >
            Agregar al carrito
          </button>
          {/* <Link href={`/product/${product.id}`}>
            <button className="bg-green-500 text-white font-bold font-small sm:text-xs rounded p-1 mt-4 w-full">
              Ver mas
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
