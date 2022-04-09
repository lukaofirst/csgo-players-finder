using AutoMapper;
using Data.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
	public class PlayerRepository : IPlayerRepository
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public PlayerRepository(DataContext context, IMapper mapper)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<List<Player>> GetAll()
		{
			var players = await _context.Players!.Include(p => p.Team)
				.Include(p => p.PlayerTrophies)!.ThenInclude(p => p.Trophy)
				.AsNoTracking()
				.ToListAsync();

			return players;
		}

		public async Task<Player> GetById(int id)
		{
			var player = await _context.Players!.Include(p => p.Team)
				.Include(p => p.PlayerTrophies)!
				.ThenInclude(p => p.Trophy)
				.AsNoTracking()
				.FirstOrDefaultAsync(p => p.Id == id);

			return player!;
		}

		public async Task<bool> CheckByNickname(string nickname)
		{
			var entityWithNickname = await _context.Players!.AsNoTracking()
				.AnyAsync(player => player.Nickname == nickname);

			if (entityWithNickname == true) return true;
			else return false;
		}

		public async Task<Player> Post(PlayerDTO playerDTO)
		{
			var playerMap = _mapper.Map(playerDTO, new Player());

			await _context.Players!.AddAsync(playerMap);

			await _context.SaveChangesAsync();

			return playerMap;
		}

		public async Task<int> Delete(int id)
		{
			var player = await _context.Players!
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			_context.Players!.Remove(player!);

			return await _context.SaveChangesAsync();
		}
	}
}