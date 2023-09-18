using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class OrdenVenta
{
    public int Id { get; set; }

    public int? UsuarioId { get; set; }

    public string? Fecha { get; set; }

    public decimal? Total { get; set; }

    public string? Estado { get; set; }
}
