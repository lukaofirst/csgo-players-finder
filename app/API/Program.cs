var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>((opt) =>
{
	opt.UseSqlite(builder.Configuration.GetConnectionString("connStr"));
});

builder.Services.AddCors();

builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<ITrophyRepository, TrophyRepository>();

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

app.UseRouting();

app.UseCors(opt =>
{
	opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
