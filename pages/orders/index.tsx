import { useState, useEffect } from "react";
import { Order } from "../../interfaces/order";
import { getToken } from "../../services/token.service";
import { getClientOrders } from "../../services/order.service";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Loading from "../../components/GlobalComponents/Loading";
import TH from "../../components/CheckoutComponents/TH";
import TDTable from "../../components/GlobalComponents/TDTable";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

const index = () => {
  const [orders, setOrders] = useState<[Order]>();
  const router = useRouter();
  const getOrders = (page = 1) => {
    if (!getToken()) {
      router.push("/auth");
    }
    if (getToken()) {
      getClientOrders(page)
        .then((res) => {
          if (res.ok) {
            setOrders(res.ordenes);
            return;
          }
          toast.error("Ah ocurrido un error inesperado");
        })
        .catch(() => {
          toast.error("Ah ocurrido un error inesperado");
        });
    }
  };
  useEffect(() => {
    return getOrders();
  }, []);
  return (
    <Layout>
      {typeof orders === "undefined" ? (
        <Loading />
      ) : (
        <div className="container p-10 text-lg font-light">
          <p>Listado de mis compras</p>
          {orders.length && orders.length >= 1 ? (
            <div className="-mx-6 w-full sm:-mx-8 sm:px-8 overflow-x-auto mt-10">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <TH name="Fecha de la compra" />
                      <TH name="Total a pagar" />
                      <TH name="Descuento total" />
                      <TH name="Estado de la compra" />
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order) => (
                        <tr key={order.id}>
                          <TDTable>
                            <span>{moment(order.fecha_Orden).calendar()}</span>
                          </TDTable>
                          <TDTable>
                            <span>${order.PrecioTotal}</span>
                          </TDTable>
                          <TDTable>
                            <span>${order.TotalDesc}</span>
                          </TDTable>
                          <TDTable>
                            {(order.status === 0 && (
                              <>
                                <FontAwesomeIcon icon={faClock} />{" "}
                                <span>Pendiente</span>
                              </>
                            )) ||
                              (order.status === 1 && (
                                <>
                                  <FontAwesomeIcon icon={faCheck} />{" "}
                                  <span>Completada</span>
                                </>
                              )) ||
                              (order.status === 2 && (
                                <>
                                  <FontAwesomeIcon icon={faCheck} />{" "}
                                  <span>Pagada con paypal</span>
                                </>
                              ))}
                          </TDTable>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <span>No has realizado ninguna compra</span>
          )}
        </div>
      )}
    </Layout>
  );
};

export default index;
