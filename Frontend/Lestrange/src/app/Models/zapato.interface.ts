export interface Zapato {
    id: number;
    nombre?: string | null;
    descripcion?: string | null;
    precio?: number | null;
    imagenUrl?: string | null;
    stock?: number | null;
    categoriaId?: number | null;
}
