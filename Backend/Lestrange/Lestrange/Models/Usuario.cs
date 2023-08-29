using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? NombreUsuario { get; set; }

    public string? Correo { get; set; }

    public string? Contrasena { get; set; }

    public string? DireccionEnvio { get; set; }

    public string? FechaRegistro { get; set; }
}
