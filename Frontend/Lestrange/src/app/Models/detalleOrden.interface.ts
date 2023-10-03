export interface DetalleOrden {
    id: number;
    ordenVentaId?: number | null;
    zapatoId?: number | null;
    cantidad?: number | null;
    precio?: number | null;
}