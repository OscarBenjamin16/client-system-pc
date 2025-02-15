import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import Table from "../../components/CheckoutComponents/Table";
import Loading from "../../components/GlobalComponents/Loading";
import Layout from "../../components/Layout";
import { Cart } from "../../interfaces/product";
import {
  addReservation,
  checkCupon,
  clearCart,
  getItems,
} from "../../services/cart.service";
import { getToken } from "../../services/token.service";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../utils/constants";

const index = () => {
  const [items, setitems] = useState<[Cart] | undefined>(undefined);
  const [reload, setReload] = useState(false);
  const [cupon, setCupon] = useState<string>("");
  const [cuponchecked, setcuponchecked] = useState<string>("");
  const router = useRouter();
  const serverURL = SOCKET_URL;
  const socket = useMemo(
    () =>
      io(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );

  useEffect(() => {
    socket.on("connect", () => {});
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {});
  }, [socket]);

  const callSocket = useCallback(() => {
    socket.emit("new", "A new order is added");
  }, [socket]);

  useEffect(() => {
    if (!getToken()) {
      router.push("/auth");
    } else {
      setitems(getItems());
      setReload(false);
    }
    return;
  }, [reload]);
  const makeReservation = () => {
    if (!getToken()) {
      toast.error("debes iniciar sesion");
      return;
    }
    if (items) {
      addReservation(items, cuponchecked).then((res) => {
        if (res.ok) {
          callSocket();
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
          <div className="px-12 flex flex-col">
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
            <div>
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
                </>
              )}
            </div>
          </div>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default index;
