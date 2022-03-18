using AutoMapper;
using Domain.DTO;
using Domain.Entities;

namespace API.Helpers
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			CreateMap<PlayerDTO, Player>()
				.ForMember(dest => dest.PlayerTrophies, opt => opt.MapFrom(src => src.Trophies))
				.AfterMap((src, dest) =>
				{
					foreach (var trophy in dest.PlayerTrophies!)
					{
						trophy.PlayerId = src.Id;
					}
				});

			CreateMap<Trophy, PlayerTrophy>()
				.ForMember(dest => dest.TrophyId, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Trophy, opt => opt.MapFrom(src => src));

			CreateMap<TeamDTO, Team>();
			CreateMap<TrophyDTO, PlayerTrophy>();
		}
	}
}