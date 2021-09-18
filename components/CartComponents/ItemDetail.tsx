import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Cart, Product } from "../../interfaces/product";
import { getProductById } from "../../services/catalog.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { removeItem } from "../../services/cart.service";

interface Props {
  item: Cart | undefined;
  setLoadCart: Dispatch<SetStateAction<boolean>>;
}

const ItemDetail = (props: Props) => {
  const { item, setLoadCart } = props;
  const [detail, setDetail] = useState<Product | undefined>();
  const getProductInfo = () => {
    getProductById(item?.id).then((res) => {
      setDetail(res.producto);
    });
  };

  useEffect(() => {
    getProductInfo();
    return;
  }, [item?.id]);

  const remove = () => {
    removeItem(item,"remove");
    setLoadCart(true);
  };
  return (
    <div className="flex border mb-4 px-8 py-2">
      <div
        className="bg-cover bg-center rounded-full w-12 h-12 overflow-hidden"
        style={{
          backgroundImage: `url('${detail?.image}')`,
        }}
      ></div>
      <span className="text-xs font-extralight ml-4 mt-4 w-28">
        {detail?.nombreProducto}
      </span>
      <div className="ml-4 float-right mt-4 flex">
        <span className="text-xs font-extralight mr-6">{item?.qt}</span>
        <span className="text-xs w-14">${item?.price.toFixed(2)}</span>
        <div className="cursor-pointer" onClick={remove}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
