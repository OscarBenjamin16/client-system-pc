import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Table from "../../components/CheckoutComponents/Table";
import Loading from "../../components/GlobalComponents/Loading";
import Layout from "../../components/Layout";
import { Cart } from "../../interfaces/product";
import {
  addReservation,
  checkCupon,
  checkout,
  clearCart,
  getItems,
} from "../../services/cart.service";
import { getToken } from "../../services/token.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { io } from "socket.io-client";

const index = () => {
  const [items, setitems] = useState<[Cart] | undefined>(undefined);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cupon, setCupon] = useState<string>();
  const [cuponchecked, setcuponchecked] = useState<string>();
  const router = useRouter();
  const socket = io("http://localhost:5000");
  socket.on("connect", () => {});
  useEffect(() => {
    if (!getToken()) {
      router.push("/auth");
    } else {
      setitems(getItems());
      setReload(false);
    }
    return;
  }, [reload]);
  const makeCheckout = () => {
    if (!getToken()) {
      toast.error("debes iniciar sesion");
      return;
    }
    if (items) {
      checkout(items, cuponchecked)
        .then((res) => {
          if (typeof window !== "undefined") {
            window.location.href = res.redirectUrl;
          }
        })
        .catch(() => {
          console.log("Error");
        });
    }
  };
  const makeReservation = () => {
    if (!getToken()) {
      toast.error("debes iniciar sesion");
      return;
    }
    setLoading(true);
    if (items) {
      addReservation(items, cuponchecked).then((res) => {
        if (res.ok) {
          socket.emit("new", "A new order is added");
          setLoading(false);
          clearCart();
          router.push("/catalog");
          toast.success("Gracias por su compra");
          return;
        }
        toast.error("Ah ocurrido un error inesperado");
      });
    }
  };
  const getInfoCupon = () => {
    console.log(items);
    if (cupon !== "") {
      checkCupon(cupon ? cupon : "").then((res) => {
        if (!res.ok) {
          toast.warning(res.message);
          setcuponchecked("");
          setCupon("");
          return;
        }
        setcuponchecked(cupon);
      });
    }
  };
  return (
    <>
      {items ? (
        <Layout>
          <div className="px-12">
            <div className="float-right mb-10">
              <div>
                <input
                  onChange={(e) => setCupon(e.currentTarget.value)}
                  className="border px-4 rounded"
                  placeholder="Ingresa el cupon"
                />
                <button
                  onClick={getInfoCupon}
                  className="ml-8 bg-green-500 px-8 text-white border-0 rounded text-sm py-1"
                >
                  Aplicar cupon
                </button>
              </div>
            </div>
            <Table
              cupon={cuponchecked}
              items={items}
              reload={true}
              setReload={setReload}
            />
            {items && items.length > 0 && (
              <>
                {" "}
                <button
                  onClick={makeReservation}
                  className="bg-green-500 px-4 text-white border-0 rounded text-sm py-1"
                >
                  Ordenar
                </button>
                <button
                  onClick={makeCheckout}
                  className="ml-8 bg-blue-500 px-8 text-white border-0 rounded text-sm py-1"
                >
                  <FontAwesomeIcon icon={faPaypal} className="mr-4" />
                  Pagar con paypal
                </button>
              </>
            )}
          </div>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default index;
