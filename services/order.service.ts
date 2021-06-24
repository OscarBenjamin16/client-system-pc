import { getToken } from './token.service';

export async function getClientOrders(page: number) {
    const response = await fetch(`/api/orden/order-client?pagina=${page}`, {
        headers: {
            token: `Bearer:${getToken()}`
        }
    })
    return response.json();
}