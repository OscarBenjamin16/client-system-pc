import { Cart } from "../interfaces/product";
import jsCookie from 'js-cookie';
import { getToken } from "./token.service";
import { SERVER_API } from "../utils/constants";

export function setItemCart(product: Cart | undefined) {
    if (getItems()) {
        const cartsItems = getItems()
        if (product) {
            const filtered: [Cart] = cartsItems.filter((a: Cart) => a.id === product.id)
            if (filtered.length === 1) {
                sumItemCart(product)
                return;
            }
            const newItem = cartsItems.concat(product)
            jsCookie.set('cart', JSON.stringify(newItem))
            return { newItem }
        }
        return
    }
    jsCookie.set('cart', JSON.stringify([product]))
}

export function getItems() {
    return JSON.parse(jsCookie.get('cart') || "[]")
}

export function removeItem(item: Cart | undefined, option: string) {
    if (item) {
        if (getItems()) {
            const cartsItems = getItems()
            const fnd = cartsItems.find((a: Cart) => a.id === item.id)
            const index = cartsItems.indexOf(fnd);
            if (option === 'remove' || cartsItems[index].qt <= 1) {
                cartsItems.splice(index, 1)
            } else if (cartsItems[index].qt > 1) {
                cartsItems[index].price = cartsItems[index].price - (cartsItems[index].price / cartsItems[index].qt)
                cartsItems[index].original_price = cartsItems[index].original_price - (cartsItems[index].original_price / cartsItems[index].qt)
                cartsItems[index].qt--
            }
            jsCookie.set('cart', JSON.stringify(cartsItems))
        }
    }
}

export function sumItemCart(product: Cart) {
    const cartsItems = getItems()
    const fnd = cartsItems.find((a: Cart) => a.id === product.id)
    const index = cartsItems.indexOf(fnd);
    cartsItems[index].price = cartsItems[index].price + (cartsItems[index].price / cartsItems[index].qt)
    cartsItems[index].original_price = cartsItems[index].original_price + (cartsItems[index].original_price / cartsItems[index].qt)
    cartsItems[index].qt++
    jsCookie.set('cart', JSON.stringify(cartsItems))
}
export function clearCart() {
    jsCookie.remove('cart')
}
export async function checkout(items: [Cart], code?: string) {
    const response = await fetch(`${SERVER_API}/pay-checkout?CODIGO_CUPON=${code}` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer:${getToken()}`
        },
        body: JSON.stringify(items)
    })
    return response.json()
}
export async function checkPayment(PayerID: string, paymentId: string, token: string, code?: string) {
    const response = await fetch(`${SERVER_API}/pay-checkout/success?paymentId=${paymentId}&token=${token}&PayerID=${PayerID}&CODIGO_CUPON=${code}`, {
        method: 'POST',
        headers: {
            token: `Bearer:${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getItems())
    })
    return response.json()
}
export async function addReservation(items: [Cart], cupon: string | undefined) {
    const response = await fetch(`${SERVER_API}/orden/add-reservation?CODIGO_CUPON=${cupon}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer:${getToken()}`
        },
        body: JSON.stringify(items)
    })
    return response.json();
}
export async function checkCupon(cupon: string) {
    const response = await fetch(`${SERVER_API}/cupon/get-cupon?code=${cupon}`)
    return response.json()
}