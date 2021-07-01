import { SERVER_API } from "../utils/constants";

export async function getMarks() {
    const response = await fetch(`${SERVER_API}/marca`);
    return response.json();
}

export async function getCategories() {
    const response = await fetch(`${SERVER_API}/categoria`);
    return response.json();
}