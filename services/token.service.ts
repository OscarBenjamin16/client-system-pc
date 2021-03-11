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

export function decodeToken(token: string):Token {
    return jwt(token)
}
