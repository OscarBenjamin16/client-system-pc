import { Rating } from "../interfaces/rating";
import { getToken } from "./token.service";

export async function addRating(data: Rating) {
    const response = await fetch('/api/producto-rating', {
        method: "POST",
        headers: {
            token: `Bearer:${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function getRating(id: number | undefined) {
    const response = await fetch(`/api/producto-rating/product?id=${id}`)
    return response.json()
}

export async function getRatingbyId(id: number | undefined) {
    const response = await fetch(`/api/producto-rating/${id}`, {
        headers: {
            token: `Bearer:${getToken()}`
        },
    })
    return response.json();
}
export async function editRating(data: Rating, id: number | undefined) {
    const response = await fetch(`/api/producto-rating/${id}`, {
        method: "PUT",
        headers: {
            token: `Bearer:${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}