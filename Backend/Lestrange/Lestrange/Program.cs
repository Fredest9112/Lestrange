using Lestrange.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Dynamically set the server name in the connection string
string localServerName = Environment.MachineName;
Console.WriteLine($"Local server name: {localServerName}");
string connectionString = $"Server={localServerName}; Database=Lestrange; Trusted_Connection=True; TrustServerCertificate=true;";

// Register the DbContext with the Dependency Injection container.
builder.Services.AddDbContext<LestrangeContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
