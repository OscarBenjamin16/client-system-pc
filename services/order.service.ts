import { getToken } from "./token.service";
import { SERVER_API } from "../utils/constants";
import { Order } from "../interfaces/order";

interface Data {
  codigoOrden: string;
}

export async function getClientOrders(page: number) {
  const response = await fetch(
    `${SERVER_API}/orden/order-client?pagina=${page}`,
    {
      headers: {
        token: `Bearer:${getToken()}`,
      },
    }
  );
  return response.json();
}

export async function CancelOrder(data: Data) {
  const response = await fetch(`${SERVER_API}/orden/cancel-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `Bearer:${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getOrderDetails(orden: Order | undefined) {
  const data = {
    orden,
  };
  const response = await fetch(`${SERVER_API}/orden-detalle/details`, {
    method: "POST",
    headers: {
      token: `Bearer:${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
