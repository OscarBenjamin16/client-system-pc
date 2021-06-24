import { Dispatch, SetStateAction } from "react";

export interface Product {
    id: number,
    categoria: {
        id: number,
        categoria: string,
    },
    cantidad_por_producto: number,
    codigo_producto: string,
    costo_standar: string,
    descripcion: string,
    descuento: string,
    image: string,
    marca: {
        id: number,
        marca: string,
    },
    nombreProducto: string,
    proveedor: {
        id: number,
        nombre_proveedor: string,
    },
    status: boolean,
    totalVenta?: number
}
export interface PVenta {
    id: number,
    categoria: {
        id: number,
        categoria: string,
    },
    cantidad_por_producto: number,
    codigo_producto: string,
    costo_standar: string,
    descripcion: string,
    descuento: string,
    image: string,
    marca: {
        id: number,
        marca: string,
    },
    nombreProducto: string,
    proveedor: {
        id: number,
        nombre_proveedor: string,
    },
    status: boolean,
    totalVenta: number
}
export interface PRating {
    id: number,
    categoria: {
        id: number,
        categoria: string,
    },
    cantidad_por_producto: number,
    codigo_producto: string,
    costo_standar: string,
    descripcion: string,
    descuento: string,
    image: string,
    marca: {
        id: number,
        marca: string,
    },
    nombreProducto: string,
    proveedor: {
        id: number,
        nombre_proveedor: string,
    },
    status: boolean,
    total: number
}
export interface CatalogProps {
    product: Product,
    view:boolean,
    setLoadCart:Dispatch<SetStateAction<boolean>>
}

export interface Cart{
       id:number,
       qt:number,
       price:number,
       original_price:number
   }

export interface Pagination{
    nextPage: number,
    prevPage: number,
    currentPage: number,
    totalPages: number,
}