namespace IoC
{
	public static class DependencyInjectionAPI
	{
		public static IServiceCollection StartServices(this IServiceCollection services)
		{
			// Database Context
			services.AddSingleton<MongoDBContext>();

			// Use Cases
			services.AddScoped<IPlayerUseCase, PlayerUseCase>();
			services.AddScoped<ITeamUseCase, TeamUseCase>();
			services.AddScoped<ITrophyUseCase, TrophyUseCase>();

			// Repositories
			services.AddScoped<IPlayerRepository, PlayerRepository>();
			services.AddScoped<ITeamRepository, TeamRepository>();
			services.AddScoped<ITrophyRepository, TrophyRepository>();

			// AutoMapper
			services.AddAutoMapper(typeof(MappingProfiles).Assembly);

			return services;
		}
	}
}