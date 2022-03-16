using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.SeedData
{
	public class SeedPlayerTrophies : IEntityTypeConfiguration<PlayerTrophy>
	{
		public void Configure(EntityTypeBuilder<PlayerTrophy> builder)
		{
			builder.HasData(
				new PlayerTrophy
				{
					PlayerId = 1,
					TrophyId = 1,
				},
				new PlayerTrophy
				{
					PlayerId = 1,
					TrophyId = 2,
				},
				new PlayerTrophy
				{
					PlayerId = 2,
					TrophyId = 1,
				},
				new PlayerTrophy
				{
					PlayerId = 2,
					TrophyId = 2,
				}
			);
		}
	}
}