import React, { ChangeEventHandler, Dispatch } from "react";
import { SetStateAction } from "react";
import { faListUl, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, PRating, Product, PVenta } from "../../interfaces/product";
import { getBestRating, getMostSellers } from "../../services/catalog.service";
interface Props {
  range: number;
  setRange: React.Dispatch<SetStateAction<number>>;
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
  setOrder: Dispatch<SetStateAction<number>>;
  setReload: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<
    SetStateAction<[Product] | undefined | Product[] | null>
  >;
  rangePagination: Function;
  setPagination: React.Dispatch<SetStateAction<Pagination | undefined>>;
}
const Bar = (props: Props) => {
  const {
    range,
    setRange,
    setView,
    view,
    setReload,
    setOrder,
    setProducts,
    rangePagination,
    setPagination,
  } = props;
  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const op = e.currentTarget.value;
    switch (Number(op)) {
      case 1:
        getMostSellers(1).then((res) => {
          const { values } = res;
          const prd = values.sort(
            (a: PVenta, b: PVenta) => b.totalVenta - a.totalVenta
          );
          setProducts(prd);
          setPagination({
            nextPage: res.nextPage,
            prevPage: res.prevPage,
            currentPage: res.currentPage,
            totalPages: res.totalPages,
          });
          rangePagination(1, res.totalPages);
        });
        break;
      case 2:
        getBestRating(1).then((res) => {
          const { values } = res;
          const prd = values.sort(
            (a: PRating, b: PRating) => b.total - a.total
          );
          setProducts(prd);
          setPagination({
            nextPage: res.nextPage,
            prevPage: res.prevPage,
            currentPage: res.currentPage,
            totalPages: res.totalPages,
          });
          rangePagination(1, res.totalPages);
        });
        break;
      case 3:
        setReload(true);
        setOrder(1);
        break;
      case 4:
        setReload(true);
        setOrder(0);
        break;
      default:
        break;
    }
  };
  return (
    <div className="border p-1 lg:p-6 bg-white w-full flex justify-center items-center">
      <span className="border w-10 h-10 hidden lg:flex justify-center items-center">
        <FontAwesomeIcon
          color={view ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.7)"}
          icon={faTh}
          className="cursor-pointer"
          onClick={() => setView(true)}
        />
      </span>
      <span className="border w-10 h-10 hidden lg:flex  justify-center items-center ml-2">
        <FontAwesomeIcon
          color={view ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)"}
          icon={faListUl}
          className="cursor-pointer"
          onClick={() => setView(false)}
        />
      </span>
      <select
        defaultValue={"DEFAULT"}
        onChange={onChange}
        className="bg-gray-300 ml-4 font-small h-7 lg:h-12 lg:px-4 lg:text-base lg:ml-48 font-bold focus:outline-none focus:border-none"
      >
        <option disabled value={"DEFAULT"}>
          Ordernar por
        </option>
        <option value={1}>Mas vendidos</option>
        <option value={2}>Populares</option>
        <option value={3}>Nuevos productos</option>
        <option value={4}>Todos los productos</option>
      </select>
      <span className="font-bold font-small lg:text-base ml-4 lg:ml-40 text-center">
        Filtrar por precio
      </span>
      <div className="flex flex-col">
        <input
          className="mt-2 ml-6 lg:ml-14 rounded-lg range overflow-hidden appearance-none bg-gray-400 h-2 focus:outline-none focus:border-0"
          type="range"
          min="1"
          max="100"
          step="1"
          defaultValue={`${range}`}
          onChange={(e) => setRange(Number(e.target.value))}
        />
        <span className="font-bold text-center text-xs">${range}</span>
      </div>
    </div>
  );
};

export default Bar;
