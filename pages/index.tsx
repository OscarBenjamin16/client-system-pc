import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SliderImg from "../components/IndexComponents/Slide";
import NewProducts from "../components/IndexComponents/NewProducts";
import BestProducts from "../components/IndexComponents/BestProducts";
import MarksSlider from "../components/IndexComponents/MarksSlider";
import InfoStore from "../components/IndexComponents/InfoStore";
import { getBestRating, getNewProducts } from "../services/catalog.service";
import { PRating, Product } from "../interfaces/product";

const index = () => {
  const [products, setProducts] = useState<Product[]>();
  const [rproducts, setRproducts] = useState<PRating[]>();
  const getProducts = () => {
    getNewProducts().then((res) => {
      if (res.productos) {
        setProducts(res.productos);
      }
    });
    getBestRating(1, 3).then((res) => {
      if (res.values) {
        const prd = res.values.sort(
          (a: PRating, b: PRating) => b.total - a.total
        );
        setRproducts(prd);
      }
    });
  };
  useEffect(() => {
    return getProducts();
  }, []);
  return (
    <div>
      <Layout>
        <SliderImg />
        <div className="mt-8 md:mt-16 sm:p-4 mb-32 w-full">
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
