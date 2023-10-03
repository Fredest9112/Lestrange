export interface Pago {
    id: number;
    ordenVentaId?: number | null;
    monto?: number | null;
    fecha?: string | null;
    metodoPago?: string | null;
}
