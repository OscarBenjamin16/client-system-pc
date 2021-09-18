import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Cart, Product } from "../../interfaces/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProductById } from "../../services/catalog.service";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { removeItem, setItemCart } from "../../services/cart.service";

interface Props {
  item: Cart | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  cupon: string | undefined;
}

const TD = (props: Props) => {
  const { item, reload, setReload, cupon } = props;
  const [detail, setDetail] = useState<Product | undefined>();
  const getProductInfo = () => {
    getProductById(item?.id).then((res) => {
      setDetail(res.producto);
    });
  };

  useEffect(() => {
    getProductInfo();
    setReload(false);
    return;
  }, [item?.id, reload, cupon]);
  const remove = () => {
    removeItem(item, "minus");
    setReload(true);
  };
  const add = () => {
    setItemCart(item);
    setReload(true);
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b whitespace-nowrap border-gray-200 bg-white text-sm w-2/5">
        <div className="flex items-center text-center">
          <div className="ml-3 flex">
            {detail?.image && (
              <div
                className="bg-cover bg-center rounded-full w-12 h-12 overflow-hidden"
                style={{
                  backgroundImage: `url('${detail.image}')`,
                }}
              />
            )}
            <span className="mt-3 ml-4">{detail?.nombreProducto}</span>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div className="flex items-center text-center">
          <div className="ml-3">
            <p>${detail?.costo_standar}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div className="flex items-center text-center">
          <div className="ml-3">
            {cupon !== "" && cupon !== undefined ? (
              <p>0</p>
            ) : (
              <p>{Number(detail?.descuento)}%</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div className="flex items-center text-center">
          <div className="ml-3">
            {cupon !== "" && cupon !== undefined ? (
              <p>${detail?.costo_standar}</p>
            ) : (
              <p>
                $
                {Number(detail?.costo_standar) -
                  (Number(detail?.costo_standar) * Number(detail?.descuento)) /
                    100}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div className="flex items-center text-center">
          <div className="ml-3 flex">
            <button
              onClick={remove}
              className="bg-red-500 p-1 px-4 text-xs text-white mr-3 rounded"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <p>{item?.qt}</p>
            <button
              onClick={add}
              className="bg-blue-500 p-1 px-4 text-xs text-white ml-3 rounded"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div className="flex items-center text-center">
          <div className="ml-3">
            {cupon !== "" && cupon !== undefined ? (
              <p>${item?.original_price.toFixed(2)}</p>
            ) : (
              <p>${item?.price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};
export default TD;
