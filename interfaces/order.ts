export interface Order {
    id: number,
    fecha_Orden: Date,
    PrecioTotal: number,
    TotalDesc: number,
    status: number,
    cliente: {
        apellido: string,
        nombre: string,
        direccion: string
    }
}