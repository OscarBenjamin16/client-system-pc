import { useState, useEffect } from "react";
import { Order } from "../../interfaces/order";
import { getToken } from "../../services/token.service";
import { CancelOrder, getClientOrders } from "../../services/order.service";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Loading from "../../components/GlobalComponents/Loading";
import TH from "../../components/CheckoutComponents/TH";
import TDTable from "../../components/GlobalComponents/TDTable";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/GlobalComponents/AnotherModal";
import OrderDetails from "../../components/OrderComponents/OrderDetails";

const index = () => {
  const [orders, setOrders] = useState<[Order]>();
  const [order, setOrder] = useState<Order>();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handlecancel = (code: string) => {
    const data = {
      codigoOrden: code,
    };
    CancelOrder(data).then((res) => {
      console.log(res);
    });
  };
  const getOrders = (page = 1) => {
    if (!getToken()) {
      router.push("/auth");
    }
    if (getToken()) {
      getClientOrders(page)
        .then((res) => {
          if (res.ok) {
            setOrders(res.ordenes);
            console.log(res);
            return;
          }
          toast.error("Ah ocurrido un error inesperado");
        })
        .catch(() => {
          toast.error("Ah ocurrido un error inesperado");
        });
    }
  };
  const handleEdit = (order: Order) => {
    setOrder(order);
    setShowModal(true);
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
          <p className="text-xl">Listado de mis compras</p>
          {orders.length && orders.length >= 1 ? (
            <div className="-mx-6 w-full sm:-mx-8 sm:px-8 overflow-x-auto mt-10">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <TH name="Codigo" />
                      <TH name="Fecha de la compra" />
                      <TH name="Total a pagar" />
                      <TH name="Descuento total" />
                      <TH name="Estado de la compra" />
                      <TH name="Acciones" />
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order) => (
                        <tr key={order.id}>
                          <TDTable>
                            <span>{order.codigoOrden}</span>
                          </TDTable>
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
                            <div className="flex">
                              {(order.status === 0 && (
                                <>
                                  <FontAwesomeIcon
                                    className="text-gray-600 w-4"
                                    icon={faClock}
                                  />{" "}
                                  <span className="ml-2">Pendiente</span>
                                </>
                              )) ||
                                (order.status === 1 && (
                                  <>
                                    <FontAwesomeIcon
                                      className="w-4 text-green-500"
                                      icon={faCheck}
                                    />{" "}
                                    <span className="ml-2">Completada</span>
                                  </>
                                )) ||
                                (order.status === 2 && (
                                  <>
                                    <FontAwesomeIcon
                                      className="w-4 text-red-500"
                                      icon={faTimes}
                                    />{" "}
                                    <span className="ml-2">Cancelada</span>
                                  </>
                                ))}
                            </div>
                          </TDTable>
                          <TDTable>
                            <div className="flex">
                              <button
                                onClick={() => handleEdit(order)}
                                className="bg-blue-500 text-white rounded px-4 text-sm py-1"
                              >
                                Ver
                              </button>
                              {order.status === 0 && (
                                <button
                                  onClick={() =>
                                    handlecancel(order.codigoOrden)
                                  }
                                  className="bg-red-400 ml-3 text-white rounded px-4 text-sm py-1"
                                >
                                  Cancelar
                                </button>
                              )}
                            </div>
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
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        title="Detalles de la orden"
      >
        <OrderDetails order={order} />
      </Modal>
    </Layout>
  );
};

export default index;
