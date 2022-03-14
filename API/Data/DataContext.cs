using API.Data.SeedData;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new SeedTrophy());
			modelBuilder.ApplyConfiguration(new SeedTeam());
			modelBuilder.ApplyConfiguration(new SeedPlayer());
		}

		public DbSet<Player>? Players { get; set; }
		public DbSet<Team>? Teams { get; set; }
		public DbSet<Trophy>? Trophies { get; set; }

	}
}