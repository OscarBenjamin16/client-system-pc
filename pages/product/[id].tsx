import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Gallery, Product } from "../../interfaces/product";
import { getProductById } from "../../services/catalog.service";
import Layout from "../../components/Layout";
import { RatingVals } from "../../interfaces/rating";
import { useAuth } from "../../hooks/useAuth";
import { Context } from "../../interfaces/context";
import RatingBars from "../../components/ProductComponents/RatingBars";
import TotalReview from "../../components/ProductComponents/TotalReview";
import { getRating } from "../../services/rating.service";
import RatingForm from "../../components/ProductComponents/RatingForm";
import Details from "../../components/ProductComponents/Details";
import RatingInfo from "../../components/ProductComponents/RatingInfo";
import UserLogRating from "../../components/ProductComponents/UserLogRating";
import { getToken } from "../../services/token.service";
import Loading from "../../components/GlobalComponents/Loading";
import CartButton from "../../components/CartComponents/CartButton";
import { toast } from "react-toastify";
import { getPhotos } from "../../services/gallery.service";

const ProductInfo = () => {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [ratingData, setRatingData] = useState<[RatingVals]>();
  const [userLogRating, setUserLogRating] = useState<RatingVals>();
  const [userToken, setUserToken] = useState(getToken());
  const [img, setImg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [totalReview, setTotalReview] = useState({ total: 0, users: 0 });
  const [images, setImages] = useState<Gallery[] | undefined>();
  const [loadCart, setLoadCart] = useState<boolean>(false);
  const ctx: Context = useAuth();
  const { auth } = ctx;
  const router = useRouter();
  const { id } = router.query;
  const getValues = () => {
    if (id) {
      getProductById(id)
        .then((res) => {
          setProduct(res.producto);
        })
        .catch(() => {
          toast.error("Ah ocurrido un error inesperado");
        });

      getRating(Number(id))
        .then((res) => {
          if (res.ratings) {
            const totalRatingSum = res.ratings
              ?.map((rat: RatingVals) => rat.ratingNumber)
              .reduce((a = 0, b = 0) => a + b, 0);
            setTotalReview({
              total: totalRatingSum,
              users: res.ratings.length,
            });
            if (getToken()) {
              const my: RatingVals = res.ratings.find(
                (a: RatingVals) => a.cliente.id === auth?.clienteid
              );
              if (my) {
                setUserLogRating(my);
              }
            }
            setRatingData(res.ratings);
          }
        })
        .catch(() => {
          toast.error("Ah ocurrido un error inesperado");
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setUserToken(getToken());
    getValues();
    return;
  }, [isLoading, id, auth]);
  useEffect(() => {
    const getImages = () => {
      getPhotos(Number(id)).then((res) => {
        if (res.ok) {
          setImages(res.GalleryImages);
          return;
        }
        setImages(undefined);
      });
    };
    return getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Layout>
      {typeof product === "undefined" ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="mt-4 p-10">
          <p className="font-light text-xl md:text-4xl h-auto overflow-hidden">
            Detalles del producto
          </p>
          <CartButton loadCart={loadCart} setLoadCart={setLoadCart} />
          <div className="flex flex-col lg:flex-row rounded shadow mt-6">
            <div className=" w-12/12 lg:w-4/12 p-5 ml-10 mt-4">
              <Details setLoadCart={setLoadCart} product={product} />
            </div>
            <div className="p-2 flex md:p-5 justify-items-center items-center justify-center">
              {!isLoading && (
                <img src={img ? img : product?.image} className=" max-h-28 md:max-h-40 lg:max-h-48 xl:max-h-56" />
              )}
              <div className="gris ml-4 grid-cols-4 gap-8">
                <div
                  onClick={() => setImg(product?.image)}
                  className="border shadow p-2 rounded flex items-center justify-center cursor-pointer"
                >
                  <img
                    className="max-h-20 img"
                    src={product?.image}
                    alt="none"
                  />
                </div>
                {images &&
                  images.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setImg(img.imagen)}
                      className="border shadow p-2 rounded flex items-center justify-center cursor-pointer"
                    >
                      <img
                        className="max-h-20 img"
                        src={img.imagen}
                        alt="none"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-4 flex md:ml-16 justify-items-center items-center justify-center">
              <TotalReview totalReview={totalReview} />
              <div className="bars ml-6">
                <RatingBars ratingData={ratingData} />
              </div>
            </div>
          </div>
          <div className="w-full p-4 mt-8">
            <>
              {userToken ? (
                <>
                  {(!userLogRating || (showForm && !isLoading)) && (
                    <RatingForm
                      setShowForm={setShowForm}
                      usRat={userLogRating}
                      product={product}
                      setIsLoading={setIsLoading}
                    />
                  )}
                </>
              ) : (
                <span className="text-sm font-extralight mt-4">
                  Inicia Sesion para poder comentar este producto
                </span>
              )}
            </>
            <div className="mt-14">
              <span className="text-xl font-semibold">Comentarios</span>
              {userLogRating && (
                <UserLogRating
                  setShowForm={setShowForm}
                  userLogRating={userLogRating}
                />
              )}
              {ratingData && ratingData.length > 0 ? (
                ratingData?.map((rd) => <RatingInfo rd={rd} key={rd.id} />)
              ) : (
                <p className="text-sm font-extralight mt-4">
                  Aun no hay comentarios de este producto
                </p>
              )}
            </div>{" "}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
