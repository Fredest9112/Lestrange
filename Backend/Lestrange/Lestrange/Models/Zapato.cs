using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class Zapato
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public decimal? Precio { get; set; }

    public string? ImagenUrl { get; set; }

    public int? Stock { get; set; }

    public int? CategoriaId { get; set; }
}
