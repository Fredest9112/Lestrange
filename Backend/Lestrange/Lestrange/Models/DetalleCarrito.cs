using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class DetalleCarrito
{
    public int Id { get; set; }

    public int? CarritoId { get; set; }

    public int? ZapatoId { get; set; }

    public int? Cantidad { get; set; }

    public decimal? Precio { get; set; }
}
