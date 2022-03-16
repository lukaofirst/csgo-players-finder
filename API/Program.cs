using System.Text.Json.Serialization;
using API.Data;
using API.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>((opt) =>
{
	opt.UseSqlite(builder.Configuration.GetConnectionString("connStr")).EnableSensitiveDataLogging();
});

builder.Services.AddControllers().AddJsonOptions(opt =>
{
	opt.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
	opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
	opt.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
