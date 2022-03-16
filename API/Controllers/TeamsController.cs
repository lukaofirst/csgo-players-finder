using API.Data;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class TeamsController : BaseAPIController
	{
		private readonly DataContext _context;
		public TeamsController(DataContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<List<Team>>> GetAll()
		{
			var teams = await _context.Teams!.AsNoTracking().ToListAsync();

			if (teams == null) return NotFound();

			return Ok(teams);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Team>> GetById(int id)
		{
			var team = await _context.Teams!.FirstOrDefaultAsync(t => t.Id == id);

			if (team == null) return NotFound();

			return Ok(team);
		}

		[HttpPost]
		public async Task<ActionResult<Team>> Post(Team team)
		{
			await _context.Teams!.AddAsync(team);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return Ok(team);

			return BadRequest(new ProblemDetails { Title = "We found an issue adding a team" });
		}

		[HttpDelete]
		public async Task<ActionResult> Delete(int id)
		{
			var team = await _context.Teams!
				.AsNoTracking()
				.Where(t => t.Id == id)
				.FirstOrDefaultAsync();

			if (team == null) return BadRequest(new ProblemDetails
			{
				Title = $"The team with id: [{id}] doesn't exist"
			});

			_context.Teams!.Remove(team);

			await _context.SaveChangesAsync();

			return Ok($"The team with id: [{id}] has been deleted successfully!");
		}
	}
}