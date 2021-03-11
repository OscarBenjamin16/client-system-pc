import { User } from "../interfaces/user"

export class Validation {
    readonly emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    readonly passwordSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    isEmptyForm = (user: User) => {
        if (user.nombre !== ""
            && user.apellido !== ""
            && user.email !== ""
            && user.password !== ""
            && user.rePassword !== "") {
            return true
        } else {
            return false
        }
    }
    isEmail = (user: User) => {
        if (this.emailValidation.test(user.email)) {
            return true
        } else {
            return false
        }
    }
    isSamePassword = (user: User) => {
        if (user.password === user.rePassword) {
            return true
        } else {
            return false
        }
    }
    isSecurePassword = (user: User) => {
        if (this.passwordSecure.test(user.password)) {
            return true
        } else {
            return false
        }
    }
}