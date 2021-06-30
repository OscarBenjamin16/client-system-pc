import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Cart, Product } from "../../interfaces/product";
import { setItemCart } from "../../services/cart.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PDetail from "./PDetail";
import { toast } from "react-toastify";

interface Props {
  product: Product | undefined;
  setLoadCart: Dispatch<SetStateAction<boolean>>;
}
function useStickyState(
  value: Product | undefined,
  setLoadCart: Dispatch<SetStateAction<boolean>>,
  setProd: Dispatch<SetStateAction<Product | undefined>>
) {
  if (value) {
    let total =
      Number(value.costo_standar) -
      (Number(value.costo_standar) * Number(value.descuento)) / 100;
    let values: Cart | undefined = {
      id: value.id,
      qt: 1,
      price: total,
      original_price:Number(value.costo_standar)
    };
    setItemCart(values);
    toast.success("Se agrego al carrito")
    setProd(undefined);
    setLoadCart(true);
  }
}
const Details = (props: Props) => {
  const { product, setLoadCart } = props;
  const [prod, setProd] = useState<Product | undefined>();
  useEffect(() => {
    useStickyState(prod, setLoadCart, setProd);
    return;
  }, [prod]);
  return (
    <>
      <PDetail name="Nombre" data={product?.nombreProducto} />
      <PDetail name="Marca" data={product?.marca.marca} />
      <PDetail name="Categoria" data={product?.categoria.categoria} />
      <PDetail name="Precio" data={"$"+product?.costo_standar} />
      <PDetail name="Descuento" data={Number(product?.descuento) + "%"} />
      <PDetail name="Descripcion" data={product?.descripcion} />
      <button
        onClick={() => setProd(product)}
        className="mt-4 rounded-xl py-1 text-sm bg-blue-500 px-4 text-white"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="mx-2" />
        Agregar al carrito
      </button>
    </>
  );
};

export default Details;
