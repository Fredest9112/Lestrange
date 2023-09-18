using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Lestrange.Models;

public partial class LestrangeContext : DbContext
{
    public LestrangeContext()
    {
    }

    public LestrangeContext(DbContextOptions<LestrangeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Carrito> Carritos { get; set; }

    public virtual DbSet<DetalleCarrito> DetalleCarritos { get; set; }
   
    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<Categoria> Categoria { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<Zapato> Zapatos { get; set; }

    public virtual DbSet<DetalleOrden> DetalleOrdens { get; set; }

    public virtual DbSet<OrdenVenta> OrdenVenta { get; set; }

    public virtual DbSet<Pago> Pagos { get; set; }

    string localServerName = Environment.MachineName;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
       => optionsBuilder.UseSqlServer($"Server={localServerName}; Database=Lestrange; Trusted_Connection=True; TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Latin1_General_CI_AS");

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.ToTable("Comentario");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fecha)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Texto)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Zapato>(entity =>
        {
            entity.ToTable("Zapato");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ImagenUrl)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ImagenURL");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Carrito>(entity =>
        {
            entity.ToTable("Carrito");

            entity.Property(e => e.FechaCreacion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DetalleCarrito>(entity =>
        {
            entity.ToTable("DetalleCarrito");

            entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("Usuario");

            entity.Property(e => e.Contrasena)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DireccionEnvio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DetalleOrden>(entity =>
        {
            entity.ToTable("DetalleOrden");

            entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<OrdenVenta>(entity =>
        {
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Total).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Pago>(entity =>
        {
            entity.ToTable("Pago");

            entity.Property(e => e.Fecha)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Monto).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MétodoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
