using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedData
{
	public class SeedTrophy : IEntityTypeConfiguration<Trophy>
	{
		public void Configure(EntityTypeBuilder<Trophy> builder)
		{
			builder.HasData(
				new Trophy
				{
					Id = 1,
					Name = "MLG Columbus",
					Year = 2016,
					IsMajor = "true"
				},
				new Trophy
				{
					Id = 2,
					Name = "ESL One Cologne",
					Year = 2016,
					IsMajor = "true"
				}
			);
		}
	}
}