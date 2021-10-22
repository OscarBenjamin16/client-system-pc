import { OrderDetail } from "../interfaces/order";

export const ReduceTotal = (
  orders: OrderDetail[] | undefined
): number | undefined => {
  const totalUnidad = orders
    ?.map((or) => or.totalUnidad)
    .reduce((a, b) => Number(a) + Number(b), 0);
  const totalINpuestos = orders
    ?.map((or) => or.impuesto)
    .reduce((a, b) => Number(a) + Number(b), 0);
  const total: number =
    totalUnidad && totalINpuestos ? totalUnidad + totalINpuestos : 0;
  return total;
};
