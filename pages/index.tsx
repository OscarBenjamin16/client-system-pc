import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SliderImg from "../components/IndexComponents/Slide";
import NewProducts from "../components/IndexComponents/NewProducts";
import BestProducts from "../components/IndexComponents/BestProducts";
import MarksSlider from "../components/IndexComponents/MarksSlider";
import InfoStore from "../components/IndexComponents/InfoStore";
import { getBestRating, getNewProducts } from "../services/catalog.service";
import Head from "next/head";
import { PRating, Product } from "../interfaces/product";

const index = () => {
  const [products, setProducts] = useState<Product[]>();
  const [rproducts, setRproducts] = useState<PRating[]>();
  const getProducts = () => {
    getNewProducts().then((res) => {
      if (res.productos) {
        const prods: Product[] = res.productos.filter(
          (prod: Product) => prod.status === true
        );
        setProducts(prods);
      }
    });
    getBestRating(1,1000000000000).then((res) => {
      if (res.values) {
        const prd = res.values.sort(
          (a: PRating, b: PRating) => b.total - a.total
        );
        const activePrd: PRating[] = prd.filter(
          (prod: PRating) => prod.status === true
        );
        setRproducts(activePrd);
      }
    });
  };
  useEffect(() => {
    return getProducts();
  }, []);
  return (
    <div>
      <Head>
        <title>M&E Soporte Tecnico</title>
        <meta
          name="description"
          content="Venta de accesorios y reparacion de laptops"
        />
        <meta property="og:title" content="M&E Soporte Tecnico" key="title" />
        <link rel="icon" href="/assets/logo-oficial.png" />
      </Head>
      <Layout>
        <SliderImg />
        <div className="mt-8 md:mt-16 mt-20 sm:p-4 mb-32 w-full">
          {products && <NewProducts products={products} />}
          {rproducts && <BestProducts products={rproducts} />}
        </div>
        <div className="bg-gray-800 w-screen h-auto">
          <InfoStore />
        </div>
        <MarksSlider />
      </Layout>
    </div>
  );
};

export default index;
