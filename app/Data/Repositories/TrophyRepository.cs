using Data.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
	public class TrophyRepository : ITrophyRepository
	{
		private readonly DataContext _context;

		public TrophyRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<List<Trophy>> GetAll()
		{
			var trophies = await _context.Trophies!
				.AsNoTracking()
				.ToListAsync();

			return trophies;
		}

		public async Task<bool> CheckByName(string name)
		{
			var existingWithName = await _context.Trophies!.AsNoTracking()
				.AnyAsync(trophy => trophy.Name == name);

			if (existingWithName == true) return true;
			else return false;
		}

		public async Task<Trophy> Post(Trophy trophy)
		{
			await _context.Trophies!.AddAsync(trophy);

			await _context.SaveChangesAsync();

			return trophy;
		}

		public async Task<bool> Delete(int id)
		{
			bool entityExist = false;

			var trophy = await _context.Trophies!
				.Where(t => t.Id == id)
				.FirstOrDefaultAsync();

			if (trophy == null) return entityExist;

			_context.Trophies!.Remove(trophy);

			await _context.SaveChangesAsync();

			return entityExist = true;
		}
	}
}