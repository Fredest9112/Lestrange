export interface Comentario {
    id: number;
    zapatoId?: number | null;
    usuarioId?: number | null;
    texto?: string | null;
    fecha?: string | null;
}
