using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class Carrito
{
    public int Id { get; set; }

    public int? UsuarioId { get; set; }

    public string? FechaCreacion { get; set; }
}
