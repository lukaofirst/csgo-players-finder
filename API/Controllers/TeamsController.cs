using API.Data;
using API.Entities;
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
		public async Task<ActionResult<List<Team>>> GetTeams()
		{
			var teams = await _context.Teams!.AsNoTracking().ToListAsync();

			if (teams == null) return NotFound();

			return Ok(teams);
		}
	}
}