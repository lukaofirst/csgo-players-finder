using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace IoC.Mappings
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			CreateMap<PlayerDTO, Player>().ReverseMap();
			CreateMap<TeamDTO, Team>().ReverseMap();
			CreateMap<TrophyDTO, Trophy>().ReverseMap();
		}
	}
}