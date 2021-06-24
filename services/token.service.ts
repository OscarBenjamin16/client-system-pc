import { TOKEN } from '../utils/constants';
import jwt from 'jwt-decode';
import jsCookie from 'js-cookie';
import { Token } from '../interfaces/token';

export function setToken(token: string) {
    jsCookie.set(TOKEN, token, { expires: 7 })
}

export function getToken() {
    return jsCookie.get(TOKEN)
}

export function decodeToken(token: string): Token {
    return jwt(token)
}

export function logout() {
    jsCookie.remove(TOKEN)
}

export function isUserLogged(): Token | null {
    const token = getToken()
    if (!token) {
        logout()
        return null;
    }
    if (isExpiredToken(token)) {
        logout()
    }
    return jwt(token)

}

export function isExpiredToken(token: string) {
    const decode = decodeToken(token)
    const expire = decode.exp && Number(decode.exp) * 1000
    const timeOut = expire && expire - Date.now()
    if (timeOut && timeOut < 0) {
        return true
    }
    return false
}