using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class Categoria
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }
}
