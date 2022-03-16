using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.SeedData
{
	public class SeedPlayer : IEntityTypeConfiguration<Player>
	{
		public void Configure(EntityTypeBuilder<Player> builder)
		{
			builder.HasData(
				new Player
				{
					Id = 1,
					Name = "Epitácio Pessoa",
					Nickname = "TACO",
					Age = 27,
					Nationality = "Brazil",
					IsActive = true,
					TeamId = 3,
				},
				new Player
				{
					Id = 2,
					Name = "Gabriel Toledo",
					Nickname = "FalleN",
					Age = 30,
					Nationality = "Brazil",
					IsActive = true,
					TeamId = 1
				},
				new Player
				{
					Id = 3,
					Name = "Andrei Piovezan",
					Nickname = "arT",
					Age = 25,
					Nationality = "Brazil",
					IsActive = true,
					TeamId = 2,
				}
			);
		}
	}
}