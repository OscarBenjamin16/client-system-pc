export interface User{
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    rePassword?:string;
}
export interface errorsValues{
    nombre:boolean,
    apellido:boolean,
    email:boolean,
    password:boolean,
    rePassword:boolean,
    empty:boolean
  }
  export interface UserLogin{
    email:string;
    password:string;
  }