import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
  const [range, setRange] = useState<number>(0);
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
    order: number = 0
  ) => {
    getPaginatedProducts(page, search, order)
      .then((res) => {
        let products: [Product] | undefined | null;
        if (price !== 0) {
          products = res.producto.filter(
            (product: Product) =>
              product.status === true && Number(product.costo_standar) <= price
          );
        } else {
          products = res.producto.filter(
            (product: Product) => product.status === true
          );
        }
        if (res.empty) {
          products = null;
          return;
        }
        if (products && products.length < 1) {
          setProducts(null);
          setPagination(undefined);
          setReload(false);
          return;
        }
        setProducts(products);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        rangePagination(1, res.totalPages);
      })
      .catch(() => {
        toast.error("Ah ocurrido un error inesperado")
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
    getProducts(1, search, range, order);
    return;
  }, [range, reload, order, search]);
  return (
    <Layout>
      {typeof products === "undefined" ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row p-1 md:p-6 lg:p-6 xl:p-6">
          <CartButton loadCart={loadCart} setLoadCart={setLoadCart} />
          <div className="w-12/12 md:w-2/12 lg:w-2/12 xl:w-2/12 p-4">
            <SearchSection
              getOfert={getOffert}
              setProducts={setProducts}
              setPagination={setPagination}
              rangePagination={rangePagination}
            />
            <div className="mt-6">
              <input
                onChange={(e) => setSearch(e.currentTarget.value)}
                type="text"
                placeholder="Escribe para buscar"
                className="border text-xs rounded p-1 w-full"
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
            {products !== null && (
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
