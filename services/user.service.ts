import { UserEdit } from "../interfaces/user";
import { getToken } from "./token.service";

export async function getAllUsers() {
    const response = await fetch('/api/authU/test');
    return await response.json();
}

export async function getUserbyId(id: number | undefined) {
    const response = await fetch(`/api/user/${id}`, {
        headers: {
            token: `Bearer:${getToken()}`
        },
    })
    return await response.json();
}

export async function editUser(data: UserEdit) {
    const response = await fetch(`/api/user/${data.id}`, {
        method: 'PUT',
        headers: {
            token: `Bearer:${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function addUserImage(file: File,id:number) {
    const formData = new FormData()
    formData.append("foto", file)
    const response = await fetch(`/api/user/photo/${id}`, {
        method: 'POST',
        headers: {
            token:`Bearer:${getToken()}`
        },
        body: formData
    })
    return response.json()
}