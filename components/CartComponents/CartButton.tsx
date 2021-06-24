import Image from "next/image";
import { useState, createRef, useEffect, SetStateAction } from "react";
import Popper, { ReferenceObject } from "popper.js";
import CartDropdown from "./CartDropdown";
import { getItems } from "../../services/cart.service";
import { Cart } from "../../interfaces/product";
import { Dispatch } from "react";

interface Props {
  loadCart: boolean;
  setLoadCart: Dispatch<SetStateAction<boolean>>;
}

const CartButton = (props: Props) => {
  const { loadCart, setLoadCart } = props;
  const [countCart, setCountCart] = useState<number>(0);
  const btnDropdownRef = createRef<Element | ReferenceObject | any>();
  const popoverDropdownRef = createRef<Element | ReferenceObject | any>();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
    setLoadCart(true)
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  useEffect(() => {
    const items: [Cart] = getItems();
    setCountCart(items.length);
    setLoadCart(false);
  }, [loadCart]);
  return (
    <>
      <div
        ref={btnDropdownRef}
        onClick={() => {
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
        className="fixed right-4 sm:right-14 top-20 cursor-pointer"
      >
        <span className="absolute z-10 bg-red-500 p-1 font-small sm:text-xs font-semibold rounded-full ml-6 sm:ml-8 text-white">
          {countCart}
        </span>
        <img src="/assets/icons/cart.png" alt="none" className="w-10 h-10 sm:w-12 sm:h-12"  />
      </div>
      <div
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "text-base lg:left-0 dpdown p-4 float-left list-none text-left rounded shadow-lg h-auto left-20 mr-10 -ml-28 bg-white"
        }
        ref={popoverDropdownRef}
      >
        <CartDropdown loadCart={loadCart} setLoadCart={setLoadCart} />
      </div>
    </>
  );
};

export default CartButton;
