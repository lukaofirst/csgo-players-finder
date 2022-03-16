using API.Data;
using API.DTO;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class PlayersController : BaseAPIController
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public PlayersController(DataContext context, IMapper mapper)
		{
			_mapper = mapper;
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
				.AsNoTracking()
				.FirstOrDefaultAsync(p => p.Id == id);

			if (player == null) return NotFound();

			return Ok(player);
		}

		[HttpPost]
		public async Task<ActionResult<PlayerDTO>> PostPlayer(PlayerDTO playerDTO)
		{
			var player = await _context.Players!.FindAsync(playerDTO.Id);

			if (player != null) return NoContent();

			var playerMap = _mapper.Map(playerDTO, new Player());

			await _context.Players.AddAsync(playerMap);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return Ok(playerMap);

			return BadRequest(new ProblemDetails { Title = "We found an issue adding a player" });
		}

		[HttpDelete]
		public async Task<ActionResult> DeletePlayer(int id)
		{
			var player = await _context.Players!
				.AsNoTracking()
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			if (player == null) return BadRequest(new ProblemDetails
			{
				Title = $"The player with id: [{id}] has already been deleted"
			});

			_context.Players!.Remove(player);

			await _context.SaveChangesAsync();

			return Ok($"The player with id: [{id}] has been deleted successfully!");
		}
	}
}