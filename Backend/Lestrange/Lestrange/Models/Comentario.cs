using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class Comentario
{
    public int Id { get; set; }

    public int? ZapatoId { get; set; }

    public int? UsuarioId { get; set; }

    public string? Texto { get; set; }

    public string? Fecha { get; set; }
}
