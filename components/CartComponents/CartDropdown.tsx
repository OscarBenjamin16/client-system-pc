import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Cart } from "../../interfaces/product";
import { getItems } from "../../services/cart.service";
import ItemDetail from "./ItemDetail";
import Link from "next/link";

interface Props {
  loadCart: boolean;
  setLoadCart: Dispatch<SetStateAction<boolean>>;
}

const CartDropdown = (props: Props) => {
  const { loadCart, setLoadCart } = props;
  const [items, setItems] = useState<[Cart]>();
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    setItems(getItems());
    setLoadCart(false);
    return;
  }, [loadCart]);

  useEffect(() => {
    const rdc = items?.length
      ? items
          ?.map((item: Cart | undefined) => item?.price)
          .reduce((a, b) => (a && b ? a + b : 0))
      : 0;
    setTotal(rdc);
    return;
  }, [items, loadCart]);
  return (
    <div>
      {items ? (
        <>
          {items.map((item) => (
            <ItemDetail key={item?.id} item={item} setLoadCart={setLoadCart} />
          ))}
        </>
      ) : (
        ""
      )}
      <div>
        <span className="text-sm h-9 font-normal ml-4">
          Total: ${total?.toFixed(2)}
        </span>
        <Link href="/checkout">
          <button className="bg-blue-600 rounded-xl px-4 float-right text-sm p-1 font-semibold text-white">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
