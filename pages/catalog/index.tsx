import React, { useState, useEffect } from "react";
import CartButton from "../../components/CartComponents/CartButton";
import Bar from "../../components/CatalogComponents/Bar";
import NotResult from "../../components/CatalogComponents/NotResult";
import PaginationProducts from "../../components/CatalogComponents/PaginationProducts";
import ProductInfo from "../../components/CatalogComponents/ProductInfo";
import SearchSection from "../../components/CatalogComponents/SearchSection";
import Loading from "../../components/GlobalComponents/Loading";
import Layout from "../../components/Layout";
import { Pagination, Product } from "../../interfaces/product";
import { getPaginatedProducts } from "../../services/catalog.service";

const index = () => {
  const [products, setProducts] = useState<
    [Product] | undefined | null | Product[]
  >();
  const [reload, setReload] = useState<boolean>(false);
  const [loadCart, setLoadCart] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const [take, setTake] = useState<number>(5);
  const [range, setRange] = useState<number | undefined>(0);
  const [pagination, setPagination] = useState<Pagination>();
  const [order, setOrder] = useState<number>(0);
  const [rangePag, setRangePag] = useState<number[]>();
  const [view, setView] = useState<boolean>(true);
  const rangePagination = (
    start: number,
    end: number,
    length: number = end - start + 1
  ) => {
    const arr: number[] = Array.from({ length }, (_, i) => start + i);
    setRangePag(arr);
  };
  const getProducts = (
    page: number = 1,
    search: string = "",
    price: number = 0,
    order: number = 0,
    take:number = 5
  ) => {
    getPaginatedProducts(
      page,
      search,
      order,
      price && price !== 0 ? price : 1000000000,take
    ).then((res) => {
      if (!res.ok) {
        setPagination(undefined);
        setProducts(null);
        return;
      }
      setProducts(res.producto);
      setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
      rangePagination(1, res.totalPages);
    });
    setReload(false);
  };
  const getOffert = () => {
    const productsOfert = products
      ?.map((prod) => prod)
      .filter((prod) => Number(prod.descuento) >= 10);
    setProducts(productsOfert);
    setPagination(undefined);
  };
  useEffect(() => {
    getProducts(1, search, range, order,take);
    return;
  }, [range, reload, order, search,take]);
  return (
    <Layout>
      {typeof products === "undefined" ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row p-1 md:p-6 lg:p-6 xl:p-6">
          <CartButton loadCart={loadCart} setLoadCart={setLoadCart} />
          <div className="w-12/12 md:w-2/12 lg:w-2/12 xl:w-2/12 p-4">
            <SearchSection
              setProducts={setProducts}
              setPagination={setPagination}
              rangePagination={rangePagination}
              getOfert={getOffert}
              range={range}
              setRange={setRange}
            />
            <div className="mt-6">
              <label className="text-xs font-semibold text-gray-600 my-2">
                Buscar
               </label>
              <input
                onChange={(e) => setSearch(e.currentTarget.value)}
                type="text"
                placeholder="Escribe para buscar"
                className="border border-gray-400 text-xs rounded p-1 w-full"
              />
            </div>
             <div className="mt-3">
               <label className="text-xs font-semibold text-gray-600 my-2">
                Cantidad a mostrar
               </label>
              <input
                onChange={(e) => setTake(Number(e.currentTarget.value))}
                type="number"
                placeholder="Escribe la cantidad a mostrar"
                className="border border-gray-400 text-xs rounded p-1 w-full"
              />
            </div>
          </div>
          <div className="w-12/12 md:w-10/12 lg:w-10/12 xl:w-10/12 p-4">
            <Bar
              rangePagination={rangePagination}
              setPagination={setPagination}
              setReload={setReload}
              range={range}
              setRange={setRange}
              view={view}
              setOrder={setOrder}
              setProducts={setProducts}
              setView={setView}
            />
            {products ? (
              <div
                className={
                  "grid mt-5 w-full " +
                  (view
                    ? "grid-cols-1 md:grid-rows-1 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center gap-3"
                    : "grid-flow-row")
                }
              >
                {products?.map((prod: Product, _) => (
                  <ProductInfo
                    setLoadCart={setLoadCart}
                    product={prod}
                    view={view}
                    key={prod.id}
                  />
                ))}
              </div>
            ) : (
              <NotResult />
            )}
            {products && (
              <PaginationProducts
                method={getProducts}
                pagination={pagination}
                rangePag={rangePag}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default index;
