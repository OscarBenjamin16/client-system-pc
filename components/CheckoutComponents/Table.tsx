import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { Cart } from "../../interfaces/product";
import TD from "./TD";
import TH from "./TH";

interface Props {
  items: [Cart | undefined] | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  cupon: string | undefined;
}

const Table = ({ items, setReload, reload, cupon }: Props) => {
  const [total, setTotal] = useState<number>();
  const getTotal = () => {
    let rdc: number | undefined;
    if (cupon !== "" && cupon !== undefined) {
      rdc = items?.length
        ? items
            ?.map((item: Cart | undefined) => item?.original_price)
            .reduce((a, b) => (a && b ? a + b : 0))
        : 0;
    } else {
      rdc = items?.length
        ? items
            ?.map((item: Cart | undefined) => item?.price)
            .reduce((a, b) => (a && b ? a + b : 0))
        : 0;
    }
    setTotal(rdc);
  };
  useEffect(() => {
    return getTotal();
  }, [items, reload, cupon]);
  return (
    <>
      {items?.length && items.length > 0 ? (
        <>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <TH name="Producto" />
                    <TH name="Precio estandar" />
                    <TH name="Descuento" />
                    <TH name="Precio" />
                    <TH name="Cantidad" />
                    <TH name="Total" />
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((item, index) => (
                      <TD
                        cupon={cupon}
                        reload={reload}
                        setReload={setReload}
                        key={index}
                        item={item}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <p className="font-semibold float-right">
              Total a pagar: ${total?.toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p>No hay productos en el carrito</p>
      )}
    </>
  );
};

export default Table;
