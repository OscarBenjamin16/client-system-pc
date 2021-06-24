export interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rePassword?: string;
}
export interface errorsValues {
  nombre: boolean,
  apellido: boolean,
  email: boolean,
  password: boolean,
  rePassword: boolean,
  empty: boolean
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDetail {
  apellido: string | undefined
  direccion: string | undefined
  email: string | undefined
  id: number | undefined
  imagen: string | undefined
  nombre: string | undefined
  telefono: string | undefined
}
export interface UserEdit {
  nombre: string | undefined
  apellido: string | undefined
  telefono: string | undefined
  direccion: string | undefined
  id:number | undefined
}
export interface UserEditErrors{
  empty: boolean
}