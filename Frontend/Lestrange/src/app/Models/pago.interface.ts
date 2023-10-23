export interface Pago {
    id: number;
    ordenVentaId?: number | null;
    monto?: number | null;
    fecha?: string | null;
    métodoPago?: string | null;
}
