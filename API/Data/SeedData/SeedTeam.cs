using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.SeedData
{
	public class SeedTeam : IEntityTypeConfiguration<Team>
	{
		public void Configure(EntityTypeBuilder<Team> builder)
		{
			builder.HasData(
				new Team
				{
					Id = 1,
					Name = "Imperial",
					Location = "Brazil",
					Region = "North America",
					FoundedYear = 2018
				},
				new Team
				{
					Id = 2,
					Name = "FURIA",
					Location = "Brazil / United States",
					Region = "North America",
					FoundedYear = 2017
				},
				new Team
				{
					Id = 3,
					Name = "GODSENT",
					Location = "Sweden / Brazil",
					Region = "North America",
					FoundedYear = 2017
				}
			);
		}
	}
}