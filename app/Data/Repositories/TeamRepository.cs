using Data.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
	public class TeamRepository : ITeamRepository
	{
		private readonly DataContext _context;
		public TeamRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<List<Team>> GetAll()
		{
			var teams = await _context.Teams!
				.Include(t => t.Players)
				.AsNoTracking()
				.ToListAsync();

			return teams;
		}

		public async Task<Team> GetById(int id)
		{
			var team = await _context.Teams!
				.Include(t => t.Players)
				.FirstOrDefaultAsync(t => t.Id == id);

			return team!;
		}

		public async Task<Team> Post(Team team)
		{
			await _context.Teams!.AddAsync(team);

			await _context.SaveChangesAsync();

			return team;
		}

		public async Task<bool> Delete(int id)
		{
			bool entityExist = false;

			var team = await _context.Teams!
				.AsNoTracking()
				.Where(t => t.Id == id)
				.FirstOrDefaultAsync();

			if (team == null) return entityExist;

			_context.Teams!.Remove(team);

			await _context.SaveChangesAsync();

			return entityExist = true;
		}
	}
}