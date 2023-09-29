export interface Pago {
    id?: number;
    OrdenVentaId?: number | null;
    Monto?: number | null;
    Fecha?: string | null;
    MétodoPago?: string | null;
  }
  