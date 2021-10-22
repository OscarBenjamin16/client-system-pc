export interface Order {
  id: number;
  fecha_Orden: Date;
  PrecioTotal: number;
  TotalDesc: number;
  status: number;
  codigoOrden: string;
  cliente: {
    apellido: string;
    nombre: string;
    direccion: string;
  };
}

export interface OrderDetail {
  beneficioLocal: string;
  cantidad: number;
  descuento: number;
  fecha: string;
  id: number;
  impuesto: string;
  orden: { fecha_Orden: string };
  producto: { nombreProducto: string };
  status: boolean;
  totalUnidad: string;
}
