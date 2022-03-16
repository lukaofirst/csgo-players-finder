using API.Data;
using AutoMapper;
using Domain.DTO;
using Domain.Entities;
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
		public async Task<ActionResult<List<Player>>> GetAll()
		{
			var players = await _context.Players!.Include(p => p.Team)
				.Include(p => p.PlayerTrophies)!.ThenInclude(p => p.Trophy)
				.AsNoTracking()
				.ToListAsync();

			if (players == null) return NotFound();

			return Ok(players);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Player>> GetById(int id)
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
		public async Task<ActionResult<PlayerDTO>> Post(PlayerDTO playerDTO)
		{
			var playerMap = _mapper.Map(playerDTO, new Player());

			await _context.Players!.AddAsync(playerMap);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return Ok(playerMap);

			return BadRequest(new ProblemDetails { Title = "We found an issue adding a player" });
		}

		[HttpDelete]
		public async Task<ActionResult> Delete(int id)
		{
			var player = await _context.Players!
				.AsNoTracking()
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			if (player == null) return BadRequest(new ProblemDetails
			{
				Title = $"The player with id: [{id}] doesn't exist"
			});

			_context.Players!.Remove(player);

			await _context.SaveChangesAsync();

			return Ok($"The player with id: [{id}] has been deleted successfully!");
		}
	}
}