using API.Data.SeedData;
using Domain.Entities;
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
			modelBuilder.Entity<PlayerTrophy>()
				.HasKey(pt => new
				{
					pt.PlayerId,
					pt.TrophyId
				});

			modelBuilder.Entity<PlayerTrophy>()
				.HasOne<Player>(pt => pt.Player)
				.WithMany(p => p.PlayerTrophies)
				.HasForeignKey(pt => pt.PlayerId);

			modelBuilder.Entity<PlayerTrophy>()
				.HasOne<Trophy>(pt => pt.Trophy)
				.WithMany(t => t.PlayerTrophies)
				.HasForeignKey(pt => pt.TrophyId);

			modelBuilder.ApplyConfiguration(new SeedTeam());
			modelBuilder.ApplyConfiguration(new SeedTrophy());
			modelBuilder.ApplyConfiguration(new SeedPlayerTrophies());
			modelBuilder.ApplyConfiguration(new SeedPlayer());
		}

		public DbSet<Player>? Players { get; set; }
		public DbSet<Team>? Teams { get; set; }
		public DbSet<Trophy>? Trophies { get; set; }
		public DbSet<PlayerTrophy>? PlayerTrophies { get; set; }
	}
}