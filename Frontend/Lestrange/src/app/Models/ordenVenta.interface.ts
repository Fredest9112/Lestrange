export interface OrdenVenta {
    id: number;
    usuarioId?: number | null;
    fecha?: string | null;
    total?: number | null;
    estado?: string | null;
}