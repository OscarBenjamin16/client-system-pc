import { Token } from "./token";

export interface Context {
    auth?:Token | undefined,
    logout?:Function | any,
    setUser?:Function
}