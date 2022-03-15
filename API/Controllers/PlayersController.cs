using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class PlayersController : BaseAPIController
	{
		private readonly DataContext _context;
		public PlayersController(DataContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<List<Player>>> GetPlayers()
		{
			var players = await _context.Players!.Include(p => p.Team)
				.Include(p => p.PlayerTrophies)!.ThenInclude(p => p.Trophy)
				.AsNoTracking()
				.ToListAsync();

			if (players == null) return NotFound();

			return Ok(players);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Player>> GetPlayerById(int id)
		{
			var player = await _context.Players!.Include(p => p.Team)
				.Include(p => p.PlayerTrophies)!
				.ThenInclude(p => p.Trophy)
				.FirstOrDefaultAsync(p => p.Id == id);

			if (player == null) return NotFound();

			return Ok(player);
		}
	}
}