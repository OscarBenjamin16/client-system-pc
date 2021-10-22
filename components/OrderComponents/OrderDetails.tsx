import moment from "moment";
import { useEffect, useState } from "react";
import { Order, OrderDetail } from "../../interfaces/order";
import { getOrderDetails } from "../../services/order.service";
import { ReduceTotal } from "../../utils/reducers";
import TD from "../CheckoutComponents/TD";
import TH from "../CheckoutComponents/TH";
import TDTable from "../GlobalComponents/TDTable";

interface Props {
  order: Order | undefined;
}

export default function OrderDetails({ order }: Props) {
  const [details, setDetails] = useState<OrderDetail[] | undefined>();
  useEffect(() => {
    const getDetails = () => {
      getOrderDetails(order).then((res) => {
        if (res.ok) {
          setDetails(res.ordenesD);
          return;
        }
        setDetails(undefined);
      });
    };
    return getDetails();
  }, [order]);
  moment.locale("es");
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg">
        <table className="min-w-full w-full overflow-auto leading-normal">
          <thead>
            <tr>
              <TH name="Producto" />
              <TH name="cantidad" />
              <TH name="Total" />
              <TH name="Fecha" />
            </tr>
          </thead>
          <tbody>
            {details &&
              details.map((d) => (
                <tr>
                  <TDTable>{d.producto?.nombreProducto}</TDTable>
                  <TDTable>{d.cantidad}</TDTable>
                  <TDTable>${Number(d.totalUnidad)}</TDTable>
                  <TDTable>
                    <span className="whitespace-nowrap">
                      {moment(d.fecha).calendar()}
                    </span>
                  </TDTable>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="font-thin text-xl mt-3">Total a pagar: ${ReduceTotal(details)?.toFixed(2)} </p>
    </div>
  );
}
