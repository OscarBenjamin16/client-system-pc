import { getToken } from './token.service';
import { SERVER_API } from "../utils/constants";

export async function getClientOrders(page: number) {
    const response = await fetch(`${SERVER_API}/orden/order-client?pagina=${page}`, {
        headers: {
            token: `Bearer:${getToken()}`
        }
    })
    return response.json();
}