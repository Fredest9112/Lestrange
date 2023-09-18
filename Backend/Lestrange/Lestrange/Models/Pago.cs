using System;
using System.Collections.Generic;

namespace Lestrange.Models;

public partial class Pago
{
    public int Id { get; set; }

    public int? OrdenVentaId { get; set; }

    public decimal? Monto { get; set; }

    public string? Fecha { get; set; }

    public string? MétodoPago { get; set; }
}
