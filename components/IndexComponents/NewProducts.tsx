import { Product } from "../../interfaces/product";
import Link from "next/link";

interface Props {
  products: Product[];
}

const NewProducts = (props: Props) => {
  const { products } = props;
  return (
    <>
      <div className="mt-96 ml-2 shadow section-new" style={{ width: "95%" }}>
        <span className="bg-blue-500 text-white p-3 mb-4 text-center">
          Nuevos Productos
        </span>
        <div className="grid mt-5 sm:mt-4 md:mt-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 lg:gap-2">
          {products.map((product, _) => (
            <div
              key={product.id}
              style={{ width: "350px" }}
              className="flex-1 sm:m-4 h-56 sm:flex-auto sm:flex-grow md:flex-grow-0 flex flex-row shadow rounded hover:shadow-md"
            >
              <div className="w-6/12">
                <div
                  className="w-full h-full flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
                  style={{
                    backgroundImage: `url("${product.image}")`,
                  }}
                ></div>
              </div>
              <div className="w-6/12 p-4 flex flex-col">
                <span className="text-xs font-bold text-center">
                  {product.nombreProducto}
                </span>
                <span className="font-small md:text-sm overflow-hidden font-medium"></span>
                <span className="font-small md:text-sm font-medium overflow-hidden mt-1"></span>
                <div className="mt-2 overflow-hidden">
                  <span className="absolute transform -rotate-45 text-white font-bold ml-2 md:ml-4 z-10 mt-2 md:mt-3 font-small md:text-sm">
                    {Number(product.descuento)}%
                  </span>
                  <img
                    src="/assets/icons/sale-tag.svg"
                    alt="none"
                    className="w-8 md:w-16"
                  />
                </div>
                <span className="bg-green-500 w-11 text-xs rounded md:text-xs p-1 font-medium overflow-hidden text-white mt-2">
                  ${product.costo_standar}
                </span>
                <button className="bg-blue-400 text-white font-bold text-xs rounded p-1 mt-4">
                  <Link href={"/product/" + product.id}>Ver Mas...</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewProducts;
