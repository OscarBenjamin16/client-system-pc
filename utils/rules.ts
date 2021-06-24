import { UserEdit } from "../interfaces/user";


const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){1,20}$/;

export function emptyData(data:UserEdit){
    if(data.nombre!== "" && data.apellido !== "" && data.direccion !== "" && data.telefono !== ""){
        return true;
    }
    return false
}

export function isEmail(email:string){
    if(emailValidation.test(email)){
        return true;
    }
}

export function isSecurePassword(password:string){
    if(passwordSecure.test(password)){
        return true
    }else{
        return false
    }
}