export interface Rating {
    titulo: string | undefined,
    comentario: string | undefined,
    ratingNumber: number | undefined,
    productoId: number | undefined
    id:null | number | undefined
}

export interface RatingVals {
    cliente: { apellido: string, nombre: string,imagen:string,id:number }
    comentario: string
    createRating: string
    id: number
    modifiedRating: string
    producto: { nombreProducto: string }
    ratingNumber: number,
    status: boolean
    titulo: string
}
export interface Bars {
    bar_1: number | undefined;
    bar_2: number | undefined;
    bar_3: number | undefined;
    bar_4: number | undefined;
    bar_5: number | undefined;
  }