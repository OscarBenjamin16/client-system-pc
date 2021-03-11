import { User, UserLogin } from "../interfaces/user";

export async function register(data:User) {
    const tmpUser = data
    delete tmpUser.rePassword
    const response = await fetch('/api/user',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tmpUser)
    })
    return await response.json()
}


export async function login(data:UserLogin){
    const response = await fetch('/api/authU/loginU',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json()
}